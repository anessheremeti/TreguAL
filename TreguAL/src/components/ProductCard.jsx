import { Star, ShoppingCart } from "lucide-react";
import React from "react";
function ProductCard({ product }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
        }
      />
    ));
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
      {/* Image Container */}
      <div className="relative bg-white h-48 sm:h-56 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-white font-semibold text-sm sm:text-base mb-3 line-clamp-2 min-h-10">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {renderStars(product.rating)}
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-lg">
            ${product.price}.00
          </span>
          <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-slate-900 p-2 rounded-lg">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
