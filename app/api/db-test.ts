import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT 1 as test')
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Database query error:', error)
    return NextResponse.json(
      { success: false, error: 'Database query failed' },
      { status: 500 }
    )
  }
}

