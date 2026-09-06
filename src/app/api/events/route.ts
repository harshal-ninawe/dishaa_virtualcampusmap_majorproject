import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/events - Retrieve active non-expired campus events
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeExpired = searchParams.get('includeExpired') === 'true';
    const facultyEmail = searchParams.get('facultyEmail');

    const client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('events');

    const todayStr = new Date().toISOString().split('T')[0];

    const query: Record<string, unknown> = {};

    if (facultyEmail) {
      query['hostedBy.email'] = facultyEmail.trim().toLowerCase();
    } else if (!includeExpired) {
      query['endDate'] = { $gte: todayStr };
    }

    const events = await collection.find(query).sort({ startDate: 1 }).toArray();

    return NextResponse.json({ success: true, count: events.length, data: events });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error fetching events from MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
      { status: 500 }
    );
  }
}

// POST /api/events - Host a new campus event (Created by Faculty)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      type,
      organizingDept,
      startDate,
      endDate,
      entryFee,
      locationType,
      locationDetails,
      description,
      hostedBy,
    } = body;

    if (!title || !type || !organizingDept || !startDate || !endDate || !locationDetails || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required event fields (Title, Type, Dept, Dates, Location, Description).' },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('events');

    const eventDoc = {
      title: title.trim(),
      type: type.trim(), // 'Technical', 'Non-Technical', 'Sports', 'Cultural', 'Workshop', 'Seminar'
      organizingDept: organizingDept.trim(),
      startDate,
      endDate,
      entryFee: entryFee ? entryFee.trim() : 'Free',
      locationType: locationType || 'indoor', // 'indoor' or 'outdoor'
      locationDetails: locationDetails.trim(), // e.g., "BLOCK B - Floor 1 - Room 101" OR "College Turf"
      description: description.trim(),
      hostedBy: {
        name: hostedBy?.name || 'Faculty Member',
        department: hostedBy?.department || organizingDept,
        email: hostedBy?.email ? hostedBy.email.trim().toLowerCase() : '',
      },
      createdAt: new Date(),
    };

    const result = await collection.insertOne(eventDoc);

    console.log('Successfully hosted event in MongoDB Atlas dishaadb.events:', result.insertedId);

    return NextResponse.json({
      success: true,
      message: 'Event successfully hosted and published!',
      eventId: result.insertedId,
      event: eventDoc,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error hosting event to MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Write Error: ${msg}` },
      { status: 500 }
    );
  }
}

// DELETE /api/events?id=... - Delete event by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Event ID is required' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('events');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully from MongoDB Atlas!',
      deletedCount: result.deletedCount,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error deleting event from MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Delete Error: ${msg}` },
      { status: 500 }
    );
  }
}
