import { Suspense } from 'react'
import { CustomerList } from '@/components/CustomerList'
import { AddCustomerForm } from '@/components/AddCustomerForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Kundhantering</h1>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Kundlista</TabsTrigger>
          <TabsTrigger value="add">Lägg till kund</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Suspense fallback={<div>Laddar kunder...</div>}>
            <CustomerList />
          </Suspense>
        </TabsContent>
        <TabsContent value="add">
          <AddCustomerForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

