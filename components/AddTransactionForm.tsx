'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  date: z.date({
    required_error: "Datum måste anges.",
  }),
  description: z.string().min(2, {
    message: "Beskrivningen måste vara minst 2 tecken.",
  }),
  amount: z.number().positive({
    message: "Beloppet måste vara större än 0.",
  }),
  type: z.enum(['income', 'expense'], {
    required_error: "Välj typ av transaktion.",
  }),
  category: z.string().min(2, {
    message: "Kategori måste anges.",
  }),
})

const incomeCategories = [
  "Försäljning - Produkter",
  "Försäljning - Tjänster",
  "Konsultarvode",
  "Ränteintäkter",
  "Hyresintäkter",
  "Övrigt - Intäkt"
]

const expenseCategories = [
  "Inköp - Produkter",
  "Inköp - Tjänster",
  "Lokalkostnader",
  "Kontorsmaterial",
  "Personalkostnader",
  "Marknadsföring",
  "Försäkringar",
  "Bank- och finanskostnader",
  "Övrigt - Kostnad"
]

export function AddTransactionForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedType, setSelectedType] = useState<'income' | 'expense' | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      amount: undefined,
      type: undefined,
      category: "",
    },
  })

  // Reset category when type changes
  const onTypeChange = (type: 'income' | 'expense') => {
    setSelectedType(type)
    form.setValue('type', type)
    form.setValue('category', '')
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      console.log('Sending data:', values);
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          amount: values.type === 'expense' ? -Math.abs(values.amount) : values.amount,
        }),
      })

      console.log('Response status:', response.status);
      const data = await response.json()
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add transaction')
      }

      toast({
        title: "Transaktion tillagd",
        description: `Transaktionen har sparats med referensnummer: ${data.reference_number}`,
      })
      form.reset()
      router.refresh()
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Fel",
        description: "Kunde inte lägga till transaktionen. Försök igen senare.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datum</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Välj ett datum</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ</FormLabel>
              <Select 
                onValueChange={(value: 'income' | 'expense') => onTypeChange(value)} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj typ av transaktion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Intäkt</SelectItem>
                  <SelectItem value="expense">Utgift</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivning</FormLabel>
              <FormControl>
                <Input placeholder="Ange beskrivning" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Belopp (SEK)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  {...field}
                  onChange={event => field.onChange(event.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedType === 'income' && (
                    incomeCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  )}
                  {selectedType === 'expense' && (
                    expenseCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Välj först typ av transaktion för att se relevanta kategorier
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sparar..." : "Spara transaktion"}
        </Button>
      </form>
    </Form>
  )
}

