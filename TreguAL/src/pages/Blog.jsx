import { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import BlogPostCard from "../components/BlogCardPost";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";
import React from "react";
export default function Blog() {
  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useFetch("http://localhost:5104/api/posts");

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentData({ comment: "", name: "", email: "", website: "" });
  };

  return (
    <div className="min-h-screen bg-[#181826] d-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

            {postsLoading && (
              <p className="text-gray-400">Loading posts...</p>
            )}

            {postsError && (
              <p className="text-red-500">
                Failed to load posts
              </p>
            )}

            {!postsLoading && !postsError && (
              <BlogPostCard posts={posts} />
            )}

            <div className="bg-white rounded-lg p-8 border border-gray-200 mt-12 hidden">
              <h3 className="text-2xl font-bold mb-6">Post a comment</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                  name="comment"
                  value={commentData.comment}
                  onChange={handleCommentChange}
                  placeholder="Your comment"
                  className="w-full border rounded px-4 py-3 h-24"
                />

                <input
                  name="name"
                  value={commentData.name}
                  onChange={handleCommentChange}
                  placeholder="Your name"
                  className="w-full border rounded px-4 py-3"
                />

                <button className="bg-cyan-500 text-white px-8 py-3 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}
