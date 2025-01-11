import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Package, ShoppingCart, FileText, BarChart2, Bell } from 'lucide-react'
import { ActivityFeed } from '@/components/ActivityFeed'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Välkommen till BMS - Systems</h1>
      <p className="text-xl mb-8">Hantera ditt företag effektivt med vår omfattande lösning för kundhantering, inventering, inköp och bokföring.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Kunder" icon={<Users className="h-8 w-8" />} value="120" change="+5%" />
        <StatCard title="Produkter" icon={<Package className="h-8 w-8" />} value="450" change="-2%" />
        <StatCard title="Inköp denna månad" icon={<ShoppingCart className="h-8 w-8" />} value="28" change="+12%" />
        <StatCard title="Obetalda fakturor" icon={<FileText className="h-8 w-8" />} value="15" change="-3%" />
        <StatCard title="Månadens försäljning" icon={<BarChart2 className="h-8 w-8" />} value="185 000 kr" change="+8%" />
        <StatCard title="Nya ärenden" icon={<Bell className="h-8 w-8" />} value="7" change="0%" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Snabba åtgärder</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <QuickActionButton href="/customers/new" label="Lägg till ny kund" />
        <QuickActionButton href="/inventory/new" label="Lägg till ny produkt" />
        <QuickActionButton href="/purchases/new" label="Registrera nytt inköp" />
        <QuickActionButton href="/accounting/invoice" label="Skapa ny faktura" />
        <QuickActionButton href="/reports" label="Generera rapport" />
        <QuickActionButton href="/support" label="Öppna supportärende" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Senaste aktiviteter</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <ActivityFeed />
      </div>
    </div>
  )
}

function StatCard({ title, icon, value, change }: { title: string, icon: React.ReactNode, value: string, change: string }) {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-600' : change === '0%' ? 'text-gray-600' : 'text-red-600';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor}`}>{change} från föregående period</p>
      </CardContent>
    </Card>
  )
}

function QuickActionButton({ href, label }: { href: string, label: string }) {
  return (
    <Link href={href}>
      <Button className="w-full">{label}</Button>
    </Link>
  )
}

