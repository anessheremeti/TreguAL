import ProductCard from './ProductCard';
import React from "react";
import {Link} from 'react-router-dom'; 
function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Link to={`/product-details/${product.id}`} key={product.id}>
                  <ProductCard key={product.id} product={product} />
          </Link> 
      ))}
    </div>
  );
}

export default ProductGrid;
