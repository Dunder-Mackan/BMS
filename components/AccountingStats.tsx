import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { query } from '@/lib/db'

async function getAccountingStats() {
  const income = await query(
    "SELECT SUM(amount) as total FROM transactions WHERE type = 'income' AND MONTH(date) = MONTH(CURRENT_DATE())"
  ) as any[]
  
  const expenses = await query(
    "SELECT SUM(amount) as total FROM transactions WHERE type = 'expense' AND MONTH(date) = MONTH(CURRENT_DATE())"
  ) as any[]
  
  const balance = await query(
    "SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE amount END) as total FROM transactions WHERE MONTH(date) = MONTH(CURRENT_DATE())"
  ) as any[]

  return {
    monthlyIncome: Number(income[0]?.total) || 0,
    monthlyExpenses: Math.abs(Number(expenses[0]?.total)) || 0,
    monthlyBalance: Number(balance[0]?.total) || 0
  }
}

export async function AccountingStats() {
  const stats = await getAccountingStats()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Månadens intäkter</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.monthlyIncome.toFixed(2)} SEK
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Månadens utgifter</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.monthlyExpenses.toFixed(2)} SEK
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Månadens resultat</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${stats.monthlyBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.monthlyBalance.toFixed(2)} SEK
          </div>
        </CardContent>
      </Card>
    </>
  )
}

