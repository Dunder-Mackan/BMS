'use client'

import { useState, useEffect } from 'react'
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

interface InventoryItem {
  id: number
  name: string
  quantity: number
  price: number
}

export function InventoryList() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchInventory()
  }, [])

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = inventory.filter(item => 
      item.name.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredInventory(filtered)
  }, [searchTerm, inventory])

  async function fetchInventory() {
    try {
      const response = await fetch('/api/inventory')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      // Convert price and quantity to numbers
      const processedData = data.map((item: any) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity)
      }))
      setInventory(processedData)
      setFilteredInventory(processedData)
    } catch (e) {
      console.error('Could not fetch inventory:', e)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Sök produkter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={fetchInventory}>Uppdatera lista</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Namn</TableHead>
            <TableHead>Antal</TableHead>
            <TableHead>Pris (SEK)</TableHead>
            <TableHead>Totalt värde (SEK)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{Number(item.price).toFixed(2)}</TableCell>
              <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

