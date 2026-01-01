import React, { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:5104/api/members";

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Nuk u mundësua marrja e të dhënave nga serveri.");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-white">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
        <p>Duke ngarkuar përdoruesit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400">
        <p>Gabim: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Provo përsëri
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Lista e Përdoruesve (Dinamike)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col gap-4 border border-slate-700 hover:border-blue-500 transition-colors"
          >
            {/* Avatar placeholder */}
            <div className="h-20 w-20 rounded-full bg-slate-700 flex items-center justify-center text-3xl">
              <i className="fa-solid fa-user"></i>
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400 capitalize">{user.role}</p>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i className="fa-solid fa-envelope text-blue-400 w-5 text-center"></i>
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i className="fa-solid fa-phone text-green-400 w-5 text-center"></i>
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i
                className={`fa-solid w-5 text-center ${user.isVerified ? "fa-circle-check text-green-400" : "fa-circle-xmark text-red-400"
                  }`}
              ></i>
              <span>{user.isVerified ? "Verifikuar" : "Jo verifikuar"}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i className="fa-solid fa-calendar text-yellow-400 w-5 text-center"></i>
              <span>Krijuar: {new Date(user.createdAt).toLocaleDateString("sq-AL")}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mt-3">
              <div className="bg-slate-700 p-3 rounded-lg">
                <p className="text-xs text-gray-300">Postime</p>
                <p className="text-lg font-bold">{user.totalPosts}</p>
              </div>

              <div className="bg-slate-700 p-3 rounded-lg">
                <p className="text-xs text-gray-300">Ads</p>
                <p className="text-lg font-bold">{user.totalAds}</p>
              </div>

              <div className="bg-slate-700 p-3 rounded-lg">
                <p className="text-xs text-gray-300">Reviews</p>
                <p className="text-lg font-bold">{user.totalReviews}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}