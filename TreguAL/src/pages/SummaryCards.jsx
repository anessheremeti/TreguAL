import React, { useEffect, useState } from "react";
import axios from "axios"; // Ose fetch
export default function SummaryCards() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5104/api/AdminDashboard/summary")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);
  if (!stats) return <div className="p-6 text-white">Loading...</div>;

  const data = [
    { title: "Total Users", value: stats.totalUsers, icon: "fa-solid fa-users" },
    { title: "Active Posts", value: stats.activePosts, icon: "fa-solid fa-list" },
    { title: "Pending Ads", value: stats.pendingAds, icon: "fa-solid fa-clock" },
    { title: "Total Payments", value: stats.totalPayments, icon: "fa-solid fa-money-bill" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Summary Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-4 text-white">
            <i className={`${item.icon} text-4xl text-blue-400`}></i>
            <div>
              <p className="text-gray-300">{item.title}</p>
              <h2 className="text-3xl font-bold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
