import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Marrja e të dhënave nga Backend (ASP.NET 9.0)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Sigurohu që URL-ja përputhet me portën e backend-it tënd
        const response = await axios.get("http://localhost:5104/api/AdminPost/list");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Gabim gjatë marrjes së postimeve:", err);
        setError("Nuk u mundësua ngarkimi i të dhënave.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Shfaqja gjatë ngarkimit
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl animate-pulse">Duke ngarkuar postimet...</div>
      </div>
    );
  }

  // Shfaqja në rast gabimi
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Post Management</h1>

      {posts.length === 0 ? (
        <p className="text-gray-400">Nuk u gjet asnjë postim në databazë.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

// 🟦 KOMPONENTI PostCard - Tashmë Dinamik
function PostCard({ post }) {
  const [index, setIndex] = useState(0);

  // Menaxhimi i fotove: Nëse databaza nuk ka foto, përdorim një placeholder
  const images = post.imageUrls && post.imageUrls.length > 0
    ? post.imageUrls
    : ["https://via.placeholder.com/300x200?text=Pa+Foto"];

  const nextImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-white flex flex-col gap-4">

      {/* SLIDER */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-700">
        <img
          src={images[index]}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        {/* Shfaq butonat vetëm nëse ka më shumë se 1 foto */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            {/* Indikatori i fotove (psh. 1/3) */}
            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Titulli dhe Kategoria */}
      <div>
        <h2 className="text-xl font-bold truncate">{post.title}</h2>
        <p className="text-gray-400 text-sm">{post.categoryName}</p>
      </div>

      {/* Përshkrimi - i kufizuar në 2 rreshta për estetikë */}
      <p className="text-gray-300 text-sm line-clamp-2 h-10">
        {post.description}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3 text-gray-300 text-sm">
        <i className="fa-solid fa-user text-blue-400 w-4"></i>
        <span>Postuar nga: <span className="font-medium text-white">{post.ownerName}</span></span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 text-gray-300 text-sm">
        <i className="fa-solid fa-flag text-yellow-400 w-4"></i>
        <span>
          Status:
          <span
            className={`ml-1 font-semibold ${post.postStatus.toLowerCase() === "active" ? "text-green-400" : "text-red-400"
              }`}
          >
            {post.postStatus}
          </span>
        </span>
      </div>

      {/* Data e krijimit */}
      <div className="flex items-center gap-3 text-gray-300 text-sm">
        <i className="fa-solid fa-calendar text-purple-400 w-4"></i>
        <span>{new Date(post.dateCreated).toLocaleDateString("sq-AL")}</span>
      </div>

      {/* Delete Button */}
      <button
        className="mt-3 bg-red-600 hover:bg-red-700 active:scale-95 transition text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
        onClick={() => alert(`Fshirja e postimit ID: ${post.postId}`)}
      >
        <i className="fa-solid fa-trash"></i>
        Delete
      </button>
    </div>
  );
}