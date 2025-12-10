import { Heart, MessageCircle, Share2 } from 'lucide-react';
import React from "react";

export default function BlogPostCard({
  image,
  title,
  description,
  date,
  category,
  author,
  featured = false
}) {
  if (featured) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 mb-12">
        <div className="flex items-center justify-center bg-white p-8">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-sm text-gray-400">{date}</span>
            <span className="text-xs px-3 py-1 bg-slate-700 text-cyan-400 rounded">
              {category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
          <div className="flex items-center justify-between">
            <a href="#" className="text-cyan-400 font-semibold hover:text-cyan-300 transition">
              Read more
            </a>
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm">
                <Heart size={16} /> 1
              </button>
              <button className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm">
                <MessageCircle size={16} /> 1
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500 transition mb-8">
      <div className="bg-white h-48 sm:h-56 flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
          <span className="text-xs text-gray-400">{date}</span>
          <span className="text-xs px-2 py-1 bg-slate-700 text-cyan-400 rounded">
            {category}
          </span>
          <span className="text-xs text-gray-500">By {author}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 hover:text-cyan-400 transition">
          {title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <a href="#" className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition">
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
  );
}
