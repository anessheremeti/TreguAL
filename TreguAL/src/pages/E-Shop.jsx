import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from "../assets/1.webp";
import img2 from "../assets/2.webp";
import img3 from "../assets/3.webp";
import img4 from "../assets/4.webp";
import img5 from "../assets/5.webp";
import RelatedProducts from "./RelatedProducts";

const Eshop = () => {
  const images = [img1, img2, img3, img4, img5];
  const [activeImage, setActiveImage] = useState(img1);

  return (
    <div className="font-brand bg-[#0D0F1A] text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition border 
                    ${
                      activeImage === img
                        ? "border-blue-500 shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                />
              ))}
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex items-center justify-center shadow-lg">
              <img
                src={activeImage}
                className="w-[450px] h-[450px] object-contain"
                alt="main"
              />
            </div>
          </div>

          <div className="max-w-xl space-y-8">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
              Logitech PRO X Rechargeable Wireless
            </h1>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
              <span className="text-sm opacity-70">(top)</span>
            </div>

            <p className="opacity-75 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim et
              volutpat lobortis enim donec adipiscing nibh.
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-500 transition px-8 py-3 rounded-lg font-medium shadow-lg">
                Kontakto Shitësin
              </button>
            </div>

            <p className="text-sm opacity-80">Sku: 02</p>
            <p className="text-sm opacity-80">
              Kategoria: <span className="font-semibold">Mouse</span>
            </p>

            <div className="mt-6 border-b border-white/10">
              <div className="flex gap-8 text-lg pb-3">
                <button className="border-b-2 border-blue-500 pb-3">
                  Pershkrimi
                </button>
                <button className="opacity-70 hover:opacity-100 pb-3">
                  Informacion shtesë
                </button>
                <button className="opacity-70 hover:opacity-100 pb-3">
                  Pamje paraprake
                </button>
              </div>
            </div>

            <p className="opacity-80 leading-relaxed pt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur in ac elementum aliquam imperdiet tellus.
            </p>
          </div>
        </div>
        <RelatedProducts />
      </div>

      <Footer />
    </div>
  );
};

export default Eshop;
