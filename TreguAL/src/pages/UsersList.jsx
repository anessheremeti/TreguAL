import React from "react";

export default function UsersList() {
  // Shembull i të dhënave të përdoruesve
  const users = [
    {
      id: 1,
      name: "Arben Krasniqi",
      role: "User",
      email: "arben@example.com",
      phone: "+383 49 123 456",
      verified: true,
      createdAt: "2024-01-10",
      posts: 12,
      ads: 3,
      reviews: 5,
    },
    {
      id: 2,
      name: "Elira Gashi",
      role: "Admin",
      email: "elira@example.com",
      phone: "+383 44 987 654",
      verified: false,
      createdAt: "2024-02-01",
      posts: 5,
      ads: 1,
      reviews: 2,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Lista e Përdoruesve</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col gap-4"
          >
            {/* Avatar placeholder */}
            <div className="h-20 w-20 rounded-full bg-slate-700 flex items-center justify-center text-3xl">
              <i className="fa-solid fa-user"></i>
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.role}</p>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i className="fa-solid fa-envelope text-blue-400"></i>
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i className="fa-solid fa-phone text-green-400"></i>
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i
                className={`fa-solid ${
                  user.verified ? "fa-circle-check text-green-400" : "fa-circle-xmark text-red-400"
                }`}
              ></i>
              <span>{user.verified ? "Verifikuar" : "Jo verifikuar"}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <i className="fa-solid fa-calendar text-yellow-400"></i>
              <span>Created: {user.createdAt}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mt-3">
              <div className="bg-slate-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Postime</p>
                <p className="text-xl font-bold">{user.posts}</p>
              </div>

              <div className="bg-slate-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Ads</p>
                <p className="text-xl font-bold">{user.ads}</p>
              </div>

              <div className="bg-slate-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Reviews</p>
                <p className="text-xl font-bold">{user.reviews}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

