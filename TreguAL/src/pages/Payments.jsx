import React from "react";

export default function Payments() {
  const payments = [
    {
      id: 1,
      user: "Arben Krasniqi",
      ad: "Reklamë për iPhone 13",
      amount: 9.99,
      status: "Paid",
      createdAt: "2024-01-22",
      transactionId: "TXN-52342345",
    },
    {
      id: 2,
      user: "Elira Gashi",
      ad: "Banesë me qira - reklamë",
      amount: 14.50,
      status: "Pending",
      createdAt: "2024-02-01",
      transactionId: "TXN-88772341",
    },
    {
      id: 3,
      user: "Kujtim Berisha",
      ad: "Shitet MacBook Pro",
      amount: 19.99,
      status: "Failed",
      createdAt: "2024-01-30",
      transactionId: "TXN-11223451",
    },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="flex flex-wrap gap-6">
        {payments.map((p) => (
          <PaymentCard key={p.id} payment={p} />
        ))}
      </div>
    </div>
  );
}

/* ------------ CARD COMPONENT ------------ */
function PaymentCard({ payment }) {
  const statusColor =
    payment.status === "Paid"
      ? "text-green-400"
      : payment.status === "Pending"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-[300px] flex flex-col gap-4">

      {/* User */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-user text-blue-400" />
        <span className="font-semibold">{payment.user}</span>
      </div>

      {/* Ad */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-bullhorn text-purple-400" />
        <span>{payment.ad}</span>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-money-bill text-green-400" />
        <span>{payment.amount} €</span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-circle-info text-yellow-400" />
        <span>
          Status: <span className={`font-semibold ${statusColor}`}>{payment.status}</span>
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-calendar text-pink-400" />
        <span>{payment.createdAt}</span>
      </div>

      {/* Transaction ID */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-hashtag text-gray-400" />
        <span>{payment.transactionId}</span>
      </div>

      {/* Delete Button */}
      <button className="mt-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
        <i className="fa-solid fa-trash"></i>
        Delete Payment
      </button>
    </div>
  );
}
