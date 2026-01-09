import { Heart, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { getFirstImageUrl } from "../utils/imageUtils";

export default function BlogPostCard({ posts }) {
  const safePosts = Array.isArray(posts) ? posts : [];
  const visiblePosts = safePosts.slice(0, 5);

  return (
    <>
      {visiblePosts.map((p) => {
        const imageUrl = getFirstImageUrl(p?.images) || "";

        return (
          <Link to={`/product-details/${p?.postId}`}>
          <div
            key={p.id}
            className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500 transition mb-8"
          >
            <div className="bg-white h-48 sm:h-56 flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl || "https://via.placeholder.com/300?text=No+Image"}
                alt={p?.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300?text=No+Image";
                }}
              />
            </div>

            <div className="p-6">
              <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                <span className="text-xs text-gray-400">
                  {p?.createdAt}
                </span>
                <span className="text-xs px-2 py-1 bg-slate-700 text-cyan-400 rounded">
                  {p?.category}
                </span>
                <span className="text-xs text-gray-500">
                  { p?.author ?  p?.author : "5 min read"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 hover:text-cyan-400 transition">
                {p?.title}
              </h3>

              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {p?.description}
              </p>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition"
                >
                  Read more
                </a>

                <div className="flex gap-3">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-white transition text-xs">
                    <Heart size={14} /> 1
                  </button>
                  <button className="text-gray-400 hover:text-white transition text-xs">
                    <MessageCircle size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          </Link>
        );
      })}
    </>
  );
}
