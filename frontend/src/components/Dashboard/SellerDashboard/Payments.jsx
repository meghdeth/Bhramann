export default function Payments() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Available Balance</span>
              <span className="font-semibold">$2,458.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Clearance</span>
              <span className="font-semibold">$846.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lifetime Earnings</span>
              <span className="font-semibold">$12,456.00</span>
            </div>
          </div>
          <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition-colors">
            Withdraw Funds
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Payout Method</h3>
          <div className="border rounded-lg p-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-2xl">B</span>
            </div>
            <div>
              <h4 className="font-semibold">Bank Account</h4>
              <p className="text-gray-600 text-sm">**** **** **** 4567</p>
              <p className="text-gray-500 text-xs mt-1">Withdrawals typically take 2-3 business days</p>
            </div>
            <button className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm ml-auto hover:bg-gray-200 transition-colors">
              Change
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((id) => (
              <tr key={id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{id}54321</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-{id < 10 ? "0" + id : id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {id % 2 === 0 ? "Package Sale: Tour Package #" + id : "Withdrawal to Bank Account"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={id % 2 === 0 ? "text-green-600" : "text-red-600"}>
                    {id % 2 === 0 ? "+" : "-"}${id * 100}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      id % 3 === 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {id % 3 === 0 ? "Pending" : "Completed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
