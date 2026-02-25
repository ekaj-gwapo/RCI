'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

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

type TransactionTableProps = {
  transactions: Transaction[]
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-emerald-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">No transactions yet. Add one to get started.</p>
      </div>
    )
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Table */}
      <div className="flex-1 bg-white border border-emerald-100 rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[600px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-100 bg-emerald-50 sticky top-0">
                <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Bank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Payee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">DV #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Control #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Particulars</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-emerald-900">Amount</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-emerald-900">Debit</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-emerald-900">Credit</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTransaction(tx)}
                  className={`border-b border-emerald-100 cursor-pointer transition-colors ${
                    selectedTransaction?.id === tx.id
                      ? 'bg-emerald-100'
                      : idx % 2 === 0
                        ? 'bg-white hover:bg-emerald-50'
                        : 'bg-emerald-50/30 hover:bg-emerald-50'
                  }`}
                >
                  <td className="px-6 py-3 text-sm text-gray-900">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{tx.bank_name}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{tx.payee}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{tx.dv_number}</td>
                  <td className="px-6 py-3 text-sm text-gray-900">{tx.control_number}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 max-w-xs truncate">{tx.particulars}</td>
                  <td className="px-6 py-3 text-sm text-right text-gray-900 font-medium">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-sm text-right text-gray-900">
                    {tx.debit > 0 ? `$${tx.debit.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-3 text-sm text-right text-gray-900">
                    {tx.credit > 0 ? `$${tx.credit.toFixed(2)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Panel */}
      {selectedTransaction && (
        <div className="w-96 bg-white border border-emerald-100 rounded-lg p-6 h-[600px] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
            <button
              onClick={() => setSelectedTransaction(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Date</label>
              <p className="text-sm text-gray-900">{new Date(selectedTransaction.date).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Bank Name</label>
              <p className="text-sm text-gray-900">{selectedTransaction.bank_name}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Payee</label>
              <p className="text-sm text-gray-900">{selectedTransaction.payee}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Address</label>
              <p className="text-sm text-gray-900">{selectedTransaction.address}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">DV Number</label>
              <p className="text-sm text-gray-900">{selectedTransaction.dv_number}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Control Number</label>
              <p className="text-sm text-gray-900">{selectedTransaction.control_number}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Particulars</label>
              <p className="text-sm text-gray-900">{selectedTransaction.particulars}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Amount</label>
              <p className="text-sm text-gray-900 font-medium">${selectedTransaction.amount.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-emerald-600 uppercase">Debit</label>
                <p className="text-sm text-gray-900">{selectedTransaction.debit > 0 ? `$${selectedTransaction.debit.toFixed(2)}` : '-'}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-emerald-600 uppercase">Credit</label>
                <p className="text-sm text-gray-900">{selectedTransaction.credit > 0 ? `$${selectedTransaction.credit.toFixed(2)}` : '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Account Code</label>
              <p className="text-sm text-gray-900">{selectedTransaction.account_code}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-600 uppercase">Remarks</label>
              <p className="text-sm text-gray-900">{selectedTransaction.remarks || '-'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
