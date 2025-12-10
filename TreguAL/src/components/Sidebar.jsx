import { ChevronRight } from 'lucide-react';
import React from "react";

export default function Sidebar() {
  const categories = [
    { name: 'Acer (25)', count: 25 },
    { name: 'Membrox (25)', count: 25 },
    { name: 'Logi (25)', count: 25 },
    { name: 'Razer (25)', count: 25 },
    { name: 'SteelSeries (25)', count: 25 },
    { name: 'HDMI (25)', count: 25 },
  ];

  const recentPosts = [
    'Lorem ipsum dolor sit amet, consectetur',
    'Lorem ipsum dolor sit amet, consectetur',
    'Lorem ipsum dolor sit amet, consectetur',
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">Category</h3>
        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition group"
            >
              <span className="text-sm">{cat.name}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">Recent post</h3>
        <div className="space-y-4">
          {recentPosts.map((post, idx) => (
            <a
              key={idx}
              href="#"
              className="block text-gray-400 hover:text-cyan-400 transition text-sm leading-relaxed"
            >
              {post}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
