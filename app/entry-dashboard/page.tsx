'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TransactionForm from '@/components/TransactionForm'
import TransactionTable from '@/components/TransactionTable'
import { LogOut, Plus, Settings } from 'lucide-react'
import Link from 'next/link'

type Transaction = {
  id: string
  bank_name: string
  payee: string
  address: string
  dv_number: string
  particulars: string
  amount: number
  date: string
  control_number: string
  account_code: string
  debit: number
  credit: number
  remarks: string
  created_at: string
}

export default function EntryDashboard() { 
  const [user, setUser] = useState<any>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showForm, setShowForm] = useState(false)
  const [logo, setLogo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        router.push('/auth/login')
        return
      }

      const user = JSON.parse(userStr)
      if (user.role !== 'entry_user') {
        router.push('/viewer-dashboard')
        return
      }

      setUser(user)
      fetchTransactions(user.id)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const fetchTransactions = async (userId: string) => {
    try {
      const response = await fetch(`/api/transactions?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100 sticky top-0 z-40">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {logo && (
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-emerald-900">Data Entry Dashboard</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/settings">
              <Button
                variant="outline"
                className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-8 flex flex-col gap-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            {showForm ? 'Hide Form' : 'Add Transaction'}
          </Button>
        </div>

        {/* Transaction Form */}
        {showForm && (
          <Card className="mb-8 border-emerald-200">
  <CardHeader>
    <CardTitle>New Transaction</CardTitle>
    <CardDescription>Enter transaction details</CardDescription>
  </CardHeader>
  <CardContent>
    <TransactionForm
      userId={user?.id}
      onSuccess={() => {
        if (user?.id) fetchTransactions(user.id)
        setShowForm(false)
      }}
    />
  </CardContent>
</Card>
        )}

        {/* Transaction Table */}
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  )
}
}
