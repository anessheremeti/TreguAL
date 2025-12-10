import { useState } from "react";
import Header from "../components/Navbar/index"; // KONTROLLONI KËTË PATH!
import Footer from "../components/Footer/index"; // KONTROLLONI KËTË PATH!
import BlogPostCard from "../components/BlogCardPost";
import Sidebar from "../components/Sidebar";
import React from "react";
export default function Blog() {
  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", commentData);
    setCommentData({ comment: "", name: "", email: "", website: "" });
  };

  const blogPosts = [
    {
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      title: "Logitech's latest keyboard has arrived",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egesies adipiscing placerat lacinied a malesuada. Mattis posuere sem, nim porttitor vitae. Faucibus sed porttitor vitae sagittis est sed diam.",
      date: "Sep 25, 2022",
      category: "Headset, Mouse - Keyboard, Mouse pod",
      author: "By Paradox",
      featured: true,
    },
    {
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      title: "New Logitech keyboard out now!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse massa lorem, mattis vulputate ut tempor at. Curabitur adipiscing placerat lacinied a malesuada.",
      date: "Sep 25, 2022",
      category: "Headset, Mouse - Keyboard, Mouse pod",
      author: "By Paradox",
    },
    {
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      title: "New Logitech keyboard released!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse massa lorem, mattis vulputate ut tempor at. Curabitur adipiscing placerat lacinied a malesuada.",
      date: "Sep 25, 2022",
      category: "Headset, Mouse - Keyboard, Mouse pod",
      author: "By Paradox",
    },
  ];

  return (
    // Zëvendësuar bg-slate-900 me bg-gray-50 për të parë përmbajtjen!
    <div className="min-h-screen style={{backgroundColor:''#181826}}">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-sm text-gray-700 mb-8">
          <a href="#" className="hover:text-cyan-600 transition">
            Shop
          </a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-cyan-600 transition">
            Blog
          </a>
          <span className="mx-2">/</span>
          <span>New modern tech is here</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {blogPosts.map((post, idx) => (
              <BlogPostCard key={idx} {...post} />
            ))}

            {/* Këto seksione i kam lënë të pandryshuara sepse janë funksionale */}

            <div className="bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg p-8 my-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    New tech, brighter life
                  </h3>
                  <p className="text-sm opacity-90">
                    Experience innovation at its finest with our latest tech
                    collection.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <p className="text-sm font-semibold">
                    Tech-powered, nature-inspired:
                  </p>
                  <p className="text-sm ml-2">
                    our office redefines workspaces
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              {" "}
              {/* Këtu kam ndryshuar bg-slate-800 në bg-white për dukshmëri */}
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                {" "}
                {/* Këtu kam ndryshuar text-white në text-gray-900 */}
                Post a comment
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <textarea
                    name="comment"
                    value={commentData.comment}
                    onChange={handleCommentChange}
                    placeholder="Your comment"
                    // Këtu i kam bërë inputet me sfond të bardhë dhe tekst të zi.
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition resize-none h-24"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="name"
                    value={commentData.name}
                    onChange={handleCommentChange}
                    placeholder="Your name"
                    className="w-full bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                {/* ... pjesa tjetër e inputeve ... */}

                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded transition w-full sm:w-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
