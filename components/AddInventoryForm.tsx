'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Produktnamnet måste vara minst 2 tecken.",
  }),
  quantity: z.number().min(0, {
    message: "Antal kan inte vara negativt.",
  }),
  price: z.number().min(0, {
    message: "Pris kan inte vara negativt.",
  }),
})

export function AddInventoryForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      price: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to add inventory item')
      }

      toast({
        title: "Produkt tillagd",
        description: "Produkten har lagts till i lagret.",
      })
      form.reset()
      router.refresh()
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte lägga till produkten. Försök igen senare.",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produktnamn</FormLabel>
              <FormControl>
                <Input placeholder="T.ex. Skruvmejsel" {...field} />
              </FormControl>
              <FormDescription>
                Ange produktens namn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Antal</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
              </FormControl>
              <FormDescription>
                Ange antalet produkter i lager.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pris (SEK)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
              </FormControl>
              <FormDescription>
                Ange priset per enhet i SEK.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Lägger till..." : "Lägg till produkt"}
        </Button>
      </form>
    </Form>
  )
}

