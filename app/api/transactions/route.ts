import { getDb, initDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// GET transactions for a user
export async function GET(request: NextRequest) {
  try {
    await initDb()
    const db = await getDb()
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const transactions = await db.all(
      'SELECT * FROM transactions WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    )

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

// POST new transaction
export async function POST(request: NextRequest) {
  try {
    await initDb()
    const db = await getDb()
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const id = randomUUID()

    await db.run(
      `INSERT INTO transactions (id, userId, bankName, payee, address, dvNumber, particulars, amount, date, controlNumber, accountCode, debit, credit, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        body.bankName,
        body.payee,
        body.address || '',
        body.dvNumber || '',
        body.particulars,
        parseFloat(body.amount),
        body.date,
        body.controlNumber || '',
        body.accountCode || '',
        parseFloat(body.debit || 0),
        parseFloat(body.credit || 0),
        body.remarks || '',
      ]
    )

    const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', [id])
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}

// DELETE transaction
export async function DELETE(request: NextRequest) {
  try {
    await initDb()
    const db = await getDb()
    const id = request.nextUrl.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Transaction ID required' },
        { status: 400 }
      )
    }

    await db.run('DELETE FROM transactions WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    )
  }
}
