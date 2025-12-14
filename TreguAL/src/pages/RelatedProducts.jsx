import React from "react";
import Carousel from "../components/Carousel";




const RelatedProducts = ({products}) => {
  return (
    <div className="w-full py-14 px-6 lg:px-8">
      <h2 className="text-white text-2xl font-bold mb-6">
        Related products
      </h2>

      <Carousel products={products} />
    </div>
  );
};

export default RelatedProducts;
