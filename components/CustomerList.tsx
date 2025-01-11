'use client'

import { useState, useEffect } from 'react'
import { CustomerTable } from './CustomerTable'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = customers.filter(customer => 
      customer.name.toLowerCase().includes(lowercasedFilter) ||
      customer.email.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredCustomers(filtered)
  }, [searchTerm, customers])

  async function fetchCustomers() {
    try {
      const response = await fetch('/api/customers')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setCustomers(data)
      setFilteredCustomers(data)
    } catch (e) {
      setError('Kunde inte hämta kunder. Försök igen senare.')
      toast({
        title: "Fel",
        description: "Kunde inte hämta kunder. Försök igen senare.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Laddar kunder...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Sök kunder..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={fetchCustomers}>Uppdatera lista</Button>
      </div>
      <CustomerTable customers={filteredCustomers} setCustomers={setCustomers} />
    </div>
  )
}

