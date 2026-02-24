'use client'

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

type ViewerTransactionTableProps = {
  transactions: Transaction[]
}

export default function ViewerTransactionTable({
  transactions,
}: ViewerTransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white border border-emerald-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">
          No transactions available. Select a data entry user to view their transactions.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-emerald-100 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-100 bg-emerald-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">
                Bank Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">Payee</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">
                Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">DV #</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">
                Control #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">
                Particulars
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">
                Account Code
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-emerald-900">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-emerald-900">Debit</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-emerald-900">
                Credit
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-emerald-900">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr
                key={tx.id}
                className={`border-b border-emerald-100 hover:bg-emerald-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'
                }`}
              >
                <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">{tx.bank_name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{tx.payee}</td>
                <td className="px-6 py-3 text-sm text-gray-900 max-w-xs truncate">
                  {tx.address}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 font-medium">{tx.dv_number}</td>
                <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                  {tx.control_number}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 max-w-xs truncate">
                  {tx.particulars}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900 font-medium">{tx.account_code}</td>
                <td className="px-6 py-3 text-sm text-right text-gray-900 font-semibold">
                  ${tx.amount.toFixed(2)}
                </td>
                <td className="px-6 py-3 text-sm text-right text-gray-900">
                  {tx.debit > 0 ? `$${tx.debit.toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-3 text-sm text-right text-gray-900">
                  {tx.credit > 0 ? `$${tx.credit.toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 max-w-xs truncate">{tx.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-emerald-50 border-t border-emerald-100 px-6 py-3">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-emerald-900">{transactions.length}</span> transactions
        </p>
      </div>
    </div>
  )
}
