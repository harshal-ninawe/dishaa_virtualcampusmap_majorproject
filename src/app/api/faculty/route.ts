import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';

// GET /api/faculty - Retrieve all faculties or filter by block, floor, roomNo
export async function GET(req: NextRequest) {
  let client;
  try {
    const { searchParams } = new URL(req.url);
    const block = searchParams.get('block');
    const floor = searchParams.get('floor');
    const roomNo = searchParams.get('roomNo');

    client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('faculties');

    const query: Record<string, unknown> = {};

    if (block) query['sittingLocation.block'] = block;
    if (floor !== null && floor !== undefined && floor !== '') query['sittingLocation.floor'] = Number(floor);
    if (roomNo) query['sittingLocation.roomNo'] = roomNo;

    // Project out passwords for security
    const faculties = await collection
      .find(query, { projection: { password: 0 } })
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, count: faculties.length, data: faculties });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error fetching faculty data from MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

// POST /api/faculty - Handle Faculty Registration & Faculty Login
export async function POST(req: NextRequest) {
  let client;
  try {
    const body = await req.json();
    const { action = 'register', email, password } = body;

    client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('faculties');

    // 🔑 ACTION 1: FACULTY LOGIN
    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: 'Email and Password are required for login.' },
          { status: 400 }
        );
      }

      const faculty = await collection.findOne({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      if (!faculty) {
        return NextResponse.json(
          { success: false, error: 'Invalid Email or Password. Please check your credentials or register a new account.' },
          { status: 401 }
        );
      }

      const { password: _, ...safeFaculty } = faculty;
      return NextResponse.json({
        success: true,
        message: 'Faculty login successful!',
        faculty: safeFaculty,
      });
    }

    // 📝 ACTION 2: FACULTY REGISTRATION
    const { name, designation, department, phone, block, floor, roomNo } = body;

    if (!name || !department || !email || !password || !block || floor === undefined || !roomNo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (Name, Department, Email, Password, Block, Floor, Room No).' },
        { status: 400 }
      );
    }

    const facultyDoc = {
      name: name.trim(),
      designation: designation || 'Faculty',
      department: department.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      password: password.trim(),
      sittingLocation: {
        block: block.trim(),
        floor: Number(floor),
        roomNo: roomNo.trim(),
      },
      updatedAt: new Date(),
    };

    const filter = { email: email.trim().toLowerCase() };

    const result = await collection.updateOne(
      filter,
      {
        $set: facultyDoc,
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    console.log('Successfully registered faculty to MongoDB Atlas dishaadb.faculties:', result);

    const { password: _, ...safeDoc } = facultyDoc;
    return NextResponse.json({
      success: true,
      message: 'Faculty account & sitting location registered successfully to MongoDB Atlas!',
      result,
      faculty: safeDoc,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error saving faculty profile to MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}
