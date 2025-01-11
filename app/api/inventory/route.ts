import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const inventory = await query('SELECT * FROM inventory ORDER BY name ASC') as any[]
    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, quantity, price } = await request.json()
    
    if (!name || quantity === undefined || price === undefined) {
      return NextResponse.json(
        { error: 'Name, quantity, and price are required' },
        { status: 400 }
      )
    }

    await query(
      'INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)',
      [name, quantity, price]
    )

    return NextResponse.json({ success: true, message: 'Inventory item added successfully' })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to add inventory item' },
      { status: 500 }
    )
  }
}

