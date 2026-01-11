import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { normalizeImageUrl } from "../utils/imageUtils";

const API_BASE = "http://localhost:5104/api/AdminPost";

export default function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===============================
  // FETCH POSTS (SAFE)
  // ===============================
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE}/list`);

      // ✅ Validim strikt
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error("Response nuk është array:", response.data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Gabim gjatë marrjes së postimeve:", err);
      setError("Nuk u mundësua ngarkimi i të dhënave.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ===============================
  // DELETE LOGIC (BEST PRACTICE)
  // ===============================
  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm(
      "A je i sigurt që dëshiron ta fshish këtë postim?"
    );
    if (!confirmed) return;

    // ✅ kopje reale (jo referencë)
    const previousPosts = [...posts];

    // Optimistic UI
    setPosts((prev) => prev.filter((p) => p.postId !== postId));

    try {
      await axios.delete(`${API_BASE}/${postId}`);
      await fetchPosts();
    } catch (err) {
      // ✅ 404 = posti nuk ekziston më → UI është në rregull
      if (err?.response?.status === 404) {
        console.warn("Posti nuk u gjet në backend – UI i sinkronizuar.");
        return;
      }

      console.error("Gabim gjatë fshirjes:", err);
      alert("Fshirja dështoi. Postimi u rikthye.");
      setPosts(previousPosts);
    }
  };

  // ===============================
  // RENDER STATES
  // ===============================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl animate-pulse">
          Duke ngarkuar postimet...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Post Management
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-400">
          Nuk u gjet asnjë postim në databazë.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.postId}
              post={post}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// =====================================================
// 🟦 PostCard – DIZAJNI I PAPREKUR, vetëm LOGJIKË
// =====================================================
function PostCard({ post, onDelete }) {
  const [index, setIndex] = useState(0);

  const images =
    post.imageUrls && post.imageUrls.length > 0
      ? post.imageUrls
          .map((url) => normalizeImageUrl(url))
          .filter(Boolean)
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
      {/* Slider */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-700">
        <img
          src={images[index]}
          alt={post.title}
          className="w-full h-full object-cover"
        />

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

            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold truncate">{post.title}</h2>
        <p className="text-gray-400 text-sm">{post.categoryName}</p>
      </div>

      <p className="text-gray-300 text-sm line-clamp-2 h-10">
        {post.description}
      </p>

      <div className="flex items-center gap-3 text-gray-300 text-sm">
        <i className="fa-solid fa-user text-blue-400 w-4"></i>
        <span>
          Postuar nga:{" "}
          <span className="font-medium text-white">
            {post.ownerName}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 text-gray-300 text-sm">
        <i className="fa-solid fa-flag text-yellow-400 w-4"></i>
        <span>
          Status:
          <span
            className={`ml-1 font-semibold ${
              post.postStatus.toLowerCase() === "active"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {post.postStatus}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 text-gray-300 text-sm">
        <i className="fa-solid fa-calendar text-purple-400 w-4"></i>
        <span>
          {new Date(post.dateCreated).toLocaleDateString("sq-AL")}
        </span>
      </div>

      {/* DELETE – tani funksional */}
      <button
        className="mt-3 bg-red-600 hover:bg-red-700 active:scale-95 transition text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
        onClick={() => onDelete(post.postId)}
      >
        <i className="fa-solid fa-trash"></i>
        Delete
      </button>
    </div>
  );
}
