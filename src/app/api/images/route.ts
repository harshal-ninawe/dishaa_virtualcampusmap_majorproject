import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db('dishaadb');
    const images = await db.collection('images').find({}).toArray();

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error('Failed to fetch images in DISHAA Main App:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
