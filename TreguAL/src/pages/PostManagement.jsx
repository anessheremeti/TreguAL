import React, { useState } from "react";

export default function PostManagement() {
  // Shembull i të dhënave me foto
  const posts = [
    {
      id: 1,
      title: "Shes iPhone 13",
      description: "iPhone 13 si i ri, memorie 128GB, bateria 90%.",
      user: "Arben Krasniqi",
      category: "Elektronikë",
      status: "Active",
      date: "2024-01-22",
      images: [
        "https://via.placeholder.com/300x200?text=iPhone+1",
        "https://via.placeholder.com/300x200?text=iPhone+2",
        "https://via.placeholder.com/300x200?text=iPhone+3",
      ],
    },
    {
      id: 2,
      title: "Banese me qira",
      description: "Banese 75m², kati i 3-të, afër qendrës.",
      user: "Elira Gashi",
      category: "Patundshmëri",
      status: "Sold",
      date: "2024-02-10",
      images: [
        "https://via.placeholder.com/300x200?text=Banese+1",
        "https://via.placeholder.com/300x200?text=Banese+2",
      ],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Post Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

// 🟦 KOMPONENTI I RI PostCard me SLIDER
function PostCard({ post }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col gap-4">

      {/* SLIDER */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <img
          src={post.images[index]}
          alt="post"
          className="w-full h-full object-cover"
        />

        {/* Prev Button */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Next Button */}
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Titulli */}
      <div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-400 text-sm">{post.category}</p>
      </div>

      {/* Përshkrimi */}
      <p className="text-gray-300">{post.description}</p>

      {/* User */}
      <div className="flex items-center gap-3 text-gray-300">
        <i className="fa-solid fa-user text-blue-400"></i>
        <span>Postuar nga: {post.user}</span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 text-gray-300">
        <i className="fa-solid fa-flag text-yellow-400"></i>
        <span>
          Status:
          <span
            className={`ml-1 font-semibold ${
              post.status === "Active" ? "text-green-400" : "text-red-400"
            }`}
          >
            {post.status}
          </span>
        </span>
      </div>

      {/* Data */}
      <div className="flex items-center gap-3 text-gray-300">
        <i className="fa-solid fa-calendar text-purple-400"></i>
        <span>{post.date}</span>
      </div>

      {/* Delete Button */}
      <button className="mt-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
        <i className="fa-solid fa-trash"></i>
        Delete
      </button>
    </div>
  );
}
