import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, BarChart } from 'lucide-react'
import { query } from '@/lib/db'

async function getInventoryStats() {
  const totalItems = await query('SELECT SUM(quantity) as total FROM inventory') as any[]
  const totalValue = await query('SELECT SUM(quantity * price) as total FROM inventory') as any[]
  const uniqueProducts = await query('SELECT COUNT(*) as total FROM inventory') as any[]

  return {
    totalItems: Number(totalItems[0]?.total) || 0,
    totalValue: Number(totalValue[0]?.total) || 0,
    uniqueProducts: Number(uniqueProducts[0]?.total) || 0,
  }
}

export async function InventoryStats() {
  const stats = await getInventoryStats()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totalt antal produkter</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalItems}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totalt lagervärde</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalValue.toFixed(2)} SEK</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unika produkter</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
        </CardContent>
      </Card>
    </>
  )
}

