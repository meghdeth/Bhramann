export default function Payments() {
  const summary = {
    available: "₹2,458.00",
    pending: "₹846.00",
    lifetime: "₹12,456.00",
  };

  const payoutMethod = {
    type: "Bank Account",
    masked: "**** **** **** 4567",
  };

  const transactions = [
    {
      id: 1,
      date: "2023-06-01",
      description: "Withdrawal to Bank Account",
      amount: "-₹100",
      type: "debit",
      status: "Completed",
    },
    {
      id: 2,
      date: "2023-06-02",
      description: "Package Sale: Tour Package #2",
      amount: "+₹200",
      type: "credit",
      status: "Completed",
    },
    {
      id: 3,
      date: "2023-06-03",
      description: "Withdrawal to Bank Account",
      amount: "-₹300",
      type: "debit",
      status: "Pending",
    },
    {
      id: 4,
      date: "2023-06-04",
      description: "Package Sale: Tour Package #4",
      amount: "+₹400",
      type: "credit",
      status: "Completed",
    },
    {
      id: 5,
      date: "2023-06-05",
      description: "Withdrawal to Bank Account",
      amount: "-₹500",
      type: "debit",
      status: "Completed",
    },
  ];

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow p-10">
          <h3 className="text-3xl font-semibold mb-8">Payment Summary</h3>
          <div className="space-y-5 text-xl">
            <div className="flex justify-between">
              <span className="text-gray-600">Available Balance</span>
              <span className="font-semibold">{summary.available}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Clearance</span>
              <span className="font-semibold">{summary.pending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lifetime Earnings</span>
              <span className="font-semibold">{summary.lifetime}</span>
            </div>
          </div>
          <button className="mt-10 bg-green-600 !text-white text-xl px-8 py-3 rounded-xl w-full hover:bg-green-700 transition-colors">
            Withdraw Funds
          </button>
        </div>

        {/* Payout Method */}
        <div className="bg-white rounded-2xl shadow p-10">
          <h3 className="text-3xl font-semibold mb-8">Payout Method</h3>
          <div className="border rounded-xl p-6 flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-4xl">{payoutMethod.type[0]}</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold">{payoutMethod.type}</h4>
              <p className="text-gray-600 text-lg">{payoutMethod.masked}</p>
              <p className="text-gray-500 text-xl mt-2">Withdrawals typically take 2-3 business days</p>
            </div>
            <button className="bg-gray-100 text-gray-700 text-lg px-5 py-2.5 rounded-md hover:bg-gray-200 transition-colors">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <h3 className="text-3xl font-semibold mb-6">Recent Transactions</h3>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-lg">
          <thead className="bg-gray-50">
            <tr>
              {["Transaction ID", "Date", "Description", "Amount", "Status"].map((heading) => (
                <th
                  key={heading}
                  className="px-10 py-6 text-left text-base font-bold text-gray-600 uppercase tracking-wide"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="cursor-pointer hover:bg-gray-50">
                <td className="px-10 py-6 whitespace-nowrap text-gray-800 font-medium">
                  #{tx.id}54321
                </td>
                <td className="px-10 py-6 whitespace-nowrap text-gray-700">{tx.date}</td>
                <td className="px-10 py-6 whitespace-nowrap text-gray-700">{tx.description}</td>
                <td className="px-10 py-6 whitespace-nowrap">
                  <span className={tx.type === "credit" ? "text-green-600" : "text-red-600"}>
                    {tx.amount}
                  </span>
                </td>
                <td className="px-10 py-6 whitespace-nowrap">
                  <span
                    className={`px-4 py-1.5 inline-flex text-base leading-6 font-semibold rounded-full ${
                      tx.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
