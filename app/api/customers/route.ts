import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    console.log('API: Attempting to fetch customers from database...');
    const customers = await query('SELECT * FROM customers')
    console.log('API: Successfully fetched customers:', customers);
    return NextResponse.json(customers)
  } catch (error) {
    console.error('API: Database error when fetching customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, company } = body

    // Validera indata
    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'Namn, e-post, telefon och adress måste fyllas i' },
        { status: 400 }
      )
    }

    // Skapa SQL-fråga med parametrar för att förhindra SQL-injektion
    const result = await query(
      'INSERT INTO customers (name, company, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [name, company || null, email, phone, address]
    )

    console.log('API: Successfully added customer:', result)

    return NextResponse.json({ 
      success: true, 
      message: 'Kund tillagd',
      customerId: result.insertId 
    })
  } catch (error) {
    console.error('API: Database error when adding customer:', error)
    return NextResponse.json(
      { error: 'Kunde inte lägga till kund', details: error.message },
      { status: 500 }
    )
  }
}

