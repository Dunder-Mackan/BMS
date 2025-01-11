import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

async function generateUniqueReference(type: 'income' | 'expense'): Promise<string> {
  const prefix = type === 'income' ? 'INV' : 'EXP'
  const year = new Date().getFullYear()
  
  // Get the latest reference number for this year and type
  const result = await query(
    `SELECT reference_number 
     FROM transactions 
     WHERE reference_number LIKE ? 
     ORDER BY reference_number DESC 
     LIMIT 1`,
    [`${prefix}-${year}-%`]
  ) as any[]

  let nextNumber = 1
  if (result.length > 0) {
    // Extract the number from the last reference number and increment it
    const lastRef = result[0].reference_number
    const lastNumber = parseInt(lastRef.split('-')[2])
    nextNumber = lastNumber + 1
  }

  // Format with leading zeros (e.g., 001, 002, etc.)
  return `${prefix}-${year}-${nextNumber.toString().padStart(3, '0')}`
}

export async function GET() {
  try {
    const transactions = await query(
      'SELECT * FROM transactions ORDER BY date DESC, id DESC'
    ) as any[]
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { date, description, amount, type, category } = await request.json()
    
    if (!date || !description || !amount || !type || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate a unique reference number
    const reference_number = await generateUniqueReference(type)

    const result = await query(
      'INSERT INTO transactions (date, description, amount, type, category, reference_number) VALUES (?, ?, ?, ?, ?, ?)',
      [date, description, amount, type, category, reference_number]
    ) as any

    return NextResponse.json({ 
      success: true, 
      message: 'Transaction added successfully',
      reference_number
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to add transaction' },
      { status: 500 }
    )
  }
}

