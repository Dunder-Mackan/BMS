import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const activities = await query(
      'SELECT * FROM activities ORDER BY time DESC LIMIT 5'
    ) as any[];

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { text, type } = await request.json();
    
    if (!text || !type) {
      return NextResponse.json(
        { error: 'Text and type are required' },
        { status: 400 }
      );
    }

    await query(
      'INSERT INTO activities (text, type) VALUES (?, ?)',
      [text, type]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add activity' },
      { status: 500 }
    );
  }
}

