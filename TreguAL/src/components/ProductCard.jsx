import { Star, ShoppingCart } from "lucide-react";
import React from "react";

function ProductCard({ product }) {
  if (!product) return null;

  const { title, images, rating = 0, price } = product;

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating
            ? "fill-yellow-400 text-yellow-400 drop-shadow"
            : "text-gray-600"
        }
      />
    ));
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-full">
      
      <div className="relative bg-white h-48 sm:h-56 flex items-center justify-center overflow-hidden">
        <img
          src={images?.map(image => image.imageUrl)[0]}
          alt={name}
          className="
            w-full h-full object-cover 
            group-hover:scale-105 
            transition-transform duration-300
          "
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-sm sm:text-base mb-3 line-clamp-2 min-h-[40px]">
          {title}
        </h3>

        <div className="flex items-center gap-1 mb-4">{renderStars()}</div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-lg">
          {price ? `$${price}` : 'Cmimi sipas marrveshjes'}
          </span>

          <button
            className="
              bg-yellow-400 text-slate-900 p-2 rounded-lg
              hover:bg-yellow-500 active:scale-95
              transition-all duration-200 shadow
            "
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
