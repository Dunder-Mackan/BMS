import { query, tableExists } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, FileText } from 'lucide-react'

export default async function Dashboard() {
  const stats = {
    customers: '0',
    products: '0',
    monthlyPurchases: '0',
    unpaidInvoices: '0'
  };

  let error = null;

  try {
    if (await tableExists('customers')) {
      const customersResult = await query('SELECT COUNT(*) as count FROM customers');
      stats.customers = customersResult[0].count;
    }
    if (await tableExists('products')) {
      const productsResult = await query('SELECT COUNT(*) as count FROM products');
      stats.products = productsResult[0].count;
    }
    if (await tableExists('purchases')) {
      const purchasesResult = await query('SELECT COUNT(*) as count FROM purchases WHERE date >= DATE_TRUNC(\'month\', CURRENT_DATE)');
      stats.monthlyPurchases = purchasesResult[0].count;
    }
    if (await tableExists('invoices')) {
      const invoicesResult = await query('SELECT COUNT(*) as count FROM invoices WHERE paid = false');
      stats.unpaidInvoices = invoicesResult[0].count;
    }
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    error = "An error occurred while fetching dashboard data.";
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Kunder" icon={<Users className="h-4 w-4" />} value={stats.customers} />
          <DashboardCard title="Produkter" icon={<Package className="h-4 w-4" />} value={stats.products} />
          <DashboardCard title="Inköp denna månad" icon={<ShoppingCart className="h-4 w-4" />} value={stats.monthlyPurchases} />
          <DashboardCard title="Obetalda fakturor" icon={<FileText className="h-4 w-4" />} value={stats.unpaidInvoices} />
        </div>
      )}
    </div>
  )
}

function DashboardCard({ title, icon, value }: { title: string, icon: React.ReactNode, value: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

