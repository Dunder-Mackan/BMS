import { Suspense } from 'react'
import { InventoryList } from '@/components/InventoryList'
import { AddInventoryForm } from '@/components/AddInventoryForm'
import { InventoryStats } from '@/components/InventoryStats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InventoryPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Lagerhantering</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Suspense fallback={<div>Laddar statistik...</div>}>
          <InventoryStats />
        </Suspense>
      </div>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lagerlista</TabsTrigger>
          <TabsTrigger value="add">Lägg till produkt</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Suspense fallback={<div>Laddar lagerlista...</div>}>
            <InventoryList />
          </Suspense>
        </TabsContent>
        <TabsContent value="add">
          <AddInventoryForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

