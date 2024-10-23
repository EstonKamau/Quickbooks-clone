import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface InvoiceData {
  date: string;
  customer_name: string;
  product: string;
  quantity: number;
  unit_of_measure: string;
  unit_price: number;
}

export function useInvoiceSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const submitInvoice = async (invoiceData: InvoiceData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name, company_name')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError

      const { error } = await supabase
        .from('customer_transactions')
        .insert([
          {
            ...invoiceData,
            type_of_sale: 'Invoice',
            total_price: invoiceData.quantity * invoiceData.unit_price,
            user_name: profileData.name,
            company_name: profileData.company_name,
          }
        ])

      if (error) throw error

      router.push('/protected') // Redirect to dashboard or confirmation page
    } catch (error) {
      console.error('Error submitting invoice:', error)
      setError('Failed to submit invoice. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitInvoice, isSubmitting, error }
}