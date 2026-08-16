import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/broadcasts - Retrieve active campus emergency broadcasts
export async function GET(req: NextRequest) {
  let client;
  try {
    client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('broadcasts');

    // Fetch active broadcasts sorted by newest first
    const broadcasts = await collection
      .find({ active: { $ne: false } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, count: broadcasts.length, data: broadcasts });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error fetching broadcast alerts from MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

// POST /api/broadcasts - Publish a new Emergency Broadcast Alert (Admin only)
export async function POST(req: NextRequest) {
  let client;
  try {
    const body = await req.json();
    const { title, message, severity = 'warning', createdBy = 'System Admin' } = body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: 'Broadcast Title and Message are required.' },
        { status: 400 }
      );
    }

    client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('broadcasts');

    const broadcastDoc = {
      title: title.trim(),
      message: message.trim(),
      severity, // 'emergency' | 'warning' | 'announcement' | 'info'
      active: true,
      createdBy,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(broadcastDoc);

    console.log('Successfully published campus broadcast alert to MongoDB dishaadb.broadcasts:', result.insertedId);

    return NextResponse.json({
      success: true,
      message: 'Emergency Broadcast published live to campus users!',
      broadcastId: result.insertedId,
      broadcast: broadcastDoc,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error publishing broadcast alert to MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Write Error: ${msg}` },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

// DELETE /api/broadcasts?id=... - Remove/Dismiss a broadcast alert
export async function DELETE(req: NextRequest) {
  let client;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Broadcast ID is required for deletion.' },
        { status: 400 }
      );
    }

    client = await getMongoClient();
    const db = client.db('dishaadb');
    const collection = db.collection('broadcasts');

    let query: Record<string, unknown> = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }

    const result = await collection.deleteOne(query);

    return NextResponse.json({
      success: true,
      message: 'Broadcast alert removed successfully from MongoDB Atlas!',
      deletedCount: result.deletedCount,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('Error deleting broadcast alert from MongoDB:', msg);
    return NextResponse.json(
      { success: false, error: `Database Delete Error: ${msg}` },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}
