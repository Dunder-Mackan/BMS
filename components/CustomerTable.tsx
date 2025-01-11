'use client'

import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { EditCustomerDialog } from './EditCustomerDialog'
import { useToast } from "@/components/ui/use-toast"

interface Customer {
  id: number
  name: string
  company: string
  email: string
  phone: string
  address: string
}

interface CustomerTableProps {
  customers: Customer[]
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
}

export function CustomerTable({ customers, setCustomers }: CustomerTableProps) {
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const { toast } = useToast()

  const handleDeleteCustomer = async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomers(customers.filter(c => c.id !== id));
        toast({
          title: "Kund raderad",
          description: "Kunden har raderats från databasen.",
        })
      } else {
        throw new Error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Fel",
        description: "Kunde inte radera kunden. Försök igen senare.",
        variant: "destructive",
      })
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Namn</TableHead>
          <TableHead>Företag</TableHead>
          <TableHead>E-post</TableHead>
          <TableHead>Telefon</TableHead>
          <TableHead>Adress</TableHead>
          <TableHead>Åtgärder</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.company}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setEditingCustomer(customer)}>
                  Redigera
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">Radera</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Är du säker?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Denna åtgärd kan inte ångras. Detta kommer permanent radera kunden från databasen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Avbryt</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteCustomer(customer.id)}>Radera</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {editingCustomer && (
        <EditCustomerDialog 
          customer={editingCustomer} 
          setCustomers={setCustomers}
          onClose={() => setEditingCustomer(null)}
        />
      )}
    </Table>
  )
}

