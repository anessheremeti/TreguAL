import React from 'react';
import { 
  Eye, 
  Heart, 
  MapPin, 
  Calendar, 
  Search, 
  Edit2, 
  Monitor, 
  Plus
} from 'lucide-react';
import Navbar from '../components/Navbar/index';
import Footer from '../components/Footer/index';
const POSTS = [
  {
    id: 1,
    title: "Kamera 4K HikVision",
    price: "89,99€",
    views: 421,
    saves: 58,
    location: "Prishtinë",
    date: "15 Sht 2023",
    image: "https://picsum.photos/id/452/200/200", // Using a tech-like placeholder
  },
  {
    id: 2,
    title: "Kamera 4K HikVision",
    price: "89,99€",
    views: 543,
    saves: 15,
    location: "Prishtinë",
    date: "15 Sht 2023",
    image: "https://picsum.photos/id/452/200/200",
  },
  {
    id: 3,
    title: "Kamera 4K HikVision",
    price: "89,99€",
    views: 1000,
    saves: 58,
    location: "Prishtinë",
    date: "15 Sht 2023",
    image: "https://picsum.photos/id/452/200/200",
  },
  {
    id: 4,
    title: "Skaduar",
    price: "63,99€",
   
    views: 491,
    saves: 13,
    location: "Prishtinë",
    date: "15 Sht 2023",
    image: "https://picsum.photos/id/452/200/200",
    isExpired: true,
  },
];
const StatItem = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-1.5 text-gray-400">
    <Icon size={14} className="opacity-70" />
    <span className="text-xs font-medium tracking-wide">{value}</span>
  </div>
);
const ActionButton = ({ icon: Icon, label }) => (
  <button 
    aria-label={label}
    className="group flex items-center justify-center w-10 h-10 rounded-xl border border-blue-500/20 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-200"
  >
    <Icon size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
  </button>
);


const PostCard = ({ post }) => {
  return (
    <article className="w-full bg-[#050812] border border-[#121623] rounded-2xl p-4 flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-blue-500/20 transition-colors duration-300">
      <div className="relative shrink-0">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0F1629] ring-1 ring-white/5">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <div className="flex-1 w-full min-w-0 flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold text-white tracking-tight truncate">
          {post.title}
        </h3>
        
        <div className="text-2xl font-bold bg-gradient-to-r from-[#5e81f4] to-[#7c63f1] bg-clip-text text-transparent w-fit">
          {post.price}
          {post.priceSuffix && <span className="text-lg ml-1">{post.priceSuffix}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
          <StatItem icon={Eye} value={post.views} />
          <div className="w-[1px] h-3 bg-gray-700/50 hidden sm:block"></div>
          <StatItem icon={Heart} value={post.saves} />
          <div className="w-[1px] h-3 bg-gray-700/50 hidden sm:block"></div>
          <StatItem icon={MapPin} value={post.location} />
          <div className="w-[1px] h-3 bg-gray-700/50 hidden sm:block"></div>
          <StatItem icon={Calendar} value={post.date} />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2 sm:mt-0 self-start sm:self-center">
        <ActionButton icon={Search} label="Preview" />
        <ActionButton icon={Edit2} label="Edit" />
        <ActionButton icon={Monitor} label="View" />
      </div>
    </article>
  );
};
const MyPostsPage = () => {
  return (
    <>
    <Navbar />
 <main className="w-full max-w-[1024px] mx-auto px-4 py-11 my-11 sm:px-6 lg:px-8 font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Postimet e mia</h1>
        <p className="text-gray-400 text-base font-normal">Menaxho të gjitha shpalljet tuaja</p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-full bg-[#0B0F1A] border border-[#1A2033] text-gray-300 text-sm font-medium hover:bg-[#131929] transition-colors">
            Të Gjitha
          </button>
          <button className="px-5 py-2 rounded-full bg-[#0B0F1A] border border-[#1A2033] text-[#4ADE80] text-sm font-medium hover:bg-[#131929] transition-colors">
            Aktive
          </button>
          <button className="px-5 py-2 rounded-full bg-[#0B0F1A] border border-[#1A2033] text-gray-400 text-sm font-medium hover:bg-[#131929] transition-colors">
            Në Pritje
          </button>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-[#0F172A] to-[#0B0F19] border border-[#2563EB]/40 text-blue-400 text-sm font-medium hover:border-blue-500 hover:text-blue-300 hover:shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)] transition-all duration-300">
          <Plus size={16} />
          <span>Krijo Shpallje Te Re</span>
        </button>
      </div>
      <h2 className="text-xl font-medium text-white mb-5">Postimet e mia</h2>

      <div className="flex flex-col gap-4">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

    </main>
    <Footer />
    </>
  );
};

export default MyPostsPage;