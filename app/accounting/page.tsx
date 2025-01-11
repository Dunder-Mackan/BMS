import { Suspense } from 'react'
import { AccountingStats } from '@/components/AccountingStats'
import { TransactionList } from '@/components/TransactionList'
import { AddTransactionForm } from '@/components/AddTransactionForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountingPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Bokföring</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Suspense fallback={<div>Laddar statistik...</div>}>
          <AccountingStats />
        </Suspense>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Transaktioner</TabsTrigger>
          <TabsTrigger value="add">Lägg till transaktion</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Suspense fallback={<div>Laddar transaktioner...</div>}>
            <TransactionList />
          </Suspense>
        </TabsContent>
        <TabsContent value="add">
          <AddTransactionForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

