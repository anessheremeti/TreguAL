import { ChevronRight } from "lucide-react";
import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("http://localhost:5104/api/category");

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useFetch("http://localhost:5104/api/posts");

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">Category</h3>

        {categoriesLoading && (
          <p className="text-gray-400">Loading...</p>
        )}
        {categoriesError && (
          <p className="text-red-500">{categoriesError}</p>
        )}

        <div className="space-y-3">
          {categories?.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition group"
            >
              <span className="text-sm">{cat.name}</span>
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">
          Recent posts
        </h3>

        {postsLoading && (
          <p className="text-gray-400">Loading...</p>
        )}
        {postsError && (
          <p className="text-red-500">{postsError}</p>
        )}

        <div className="space-y-4">
          {posts?.map((post) => (
            <Link
              key={post.postId}
              to={`/product-details/${post.postId}`}
              className="block text-gray-400 hover:text-cyan-400 transition text-sm leading-relaxed"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
