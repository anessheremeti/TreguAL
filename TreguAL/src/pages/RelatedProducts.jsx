import React from "react";
import Carousel from "../components/Carousel";

// Dummy products
import headset from "../assets/pro-headset-gallery-1.webp";
import mouse from "../assets/61oE1NouXuL._AC_SX466_-removebg-preview.png";
import pinkHeadset from "../assets/91fadda1-6a3d-4eb4-a772-01e8ddb836d0-removebg-preview.png";
import pinkKeyboard from "../assets/71vruZcMudL._AC_SY300_SX300_QL70_FMwebp_-removebg-preview.png";

const products = [
  {
    id: 1,
    name: "Logitech G Pro X Wireless Gaming Headset",
    image: headset,
    rating: 5,
  },
  {
    id: 2,
    name: "Logitech G203 LIGHTSYNC",
    image: mouse,
    rating: 4,
  },
  {
    id: 3,
    name: "Logitech G PRO Mechanical Gaming Keyboard",
    image: pinkHeadset,
    rating: 4,
  },
  {
    id: 4,
    name: "Logitech G PRO X TKL Wireless Mech Gaming Keyboard Pink",
    image: pinkKeyboard,
    rating: 4,
  },
  
];

const RelatedProducts = () => {
  return (
    <div className="w-full py-14 px-6 lg:px-24">
      <h2 className="text-white text-2xl font-bold mb-6">
        Related products
      </h2>

      <Carousel items={products} />
    </div>
  );
};

export default RelatedProducts;
