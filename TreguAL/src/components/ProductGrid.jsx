import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import React from 'react';

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        Nuk ka produkte për t'u shfaqur
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Link to={`/product-details/${product.postId}`} key={product.postId}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
