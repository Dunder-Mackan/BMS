'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  reference_number: string
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = transactions.filter(transaction => 
      transaction.description.toLowerCase().includes(lowercasedFilter) ||
      transaction.category.toLowerCase().includes(lowercasedFilter) ||
      transaction.reference_number.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredTransactions(filtered)
  }, [searchTerm, transactions])

  async function fetchTransactions() {
    try {
      const response = await fetch('/api/transactions')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const processedData = data.map((transaction: any) => ({
        ...transaction,
        amount: Number(transaction.amount)
      }))
      setTransactions(processedData)
      setFilteredTransactions(processedData)
    } catch (e) {
      console.error('Could not fetch transactions:', e)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Sök transaktioner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={fetchTransactions}>Uppdatera lista</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Beskrivning</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Referensnummer</TableHead>
            <TableHead>Belopp (SEK)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {format(new Date(transaction.date), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.reference_number}</TableCell>
              <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                {transaction.type === 'income' ? '+' : '-'}{Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

