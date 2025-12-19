import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RelatedProducts from "./RelatedProducts";

const Eshop = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5104/api/posts/${productId}`);
        
        if (!res.ok) {
          throw new Error("Produkti nuk u gjet");
        }

        const data = await res.json();

        if (isMounted) {
          setProduct(data);
          setActiveImage(data.images?.[0]?.imageUrl || null);
          console.log(data);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0F1A] text-white">
        Duke u ngarkuar...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0F1A] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="font-brand bg-[#0D0F1A] text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* IMAGES */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.imageUrl}
                  alt="thumb"
                  onClick={() => setActiveImage(img.imageUrl)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition border 
                    ${activeImage === img.imageUrl
                      ? "border-blue-500 shadow-lg"
                      : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                />
              ))}
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex items-center justify-center shadow-lg w-[450px] h-[37rem]">
              {activeImage && (
                <img
                  src={activeImage}
                  className="w-[450px] h-[450px] object-contain"
                  alt="main"
                />
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="max-w-xl space-y-8">
            <h1 className="text-3xl lg:text-4xl font-semibold">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
              <span className="text-sm opacity-70">(top)</span>
            </div>

            <p className="opacity-75 leading-relaxed">
              {product.description}
            </p>

            <button className="bg-blue-600 hover:bg-blue-500 transition px-8 py-3 rounded-lg font-medium shadow-lg">
              Kontakto Shitësin
            </button>

            <p className="text-sm opacity-80">
              Telefon: <span className="font-semibold">{product.phoneNumber}</span>
            </p>

            <div className="mt-6 border-b border-white/10">
              <div className="flex gap-8 text-lg pb-3">
                <button className="border-b-2 border-blue-500 pb-3">
                  Përshkrimi
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
              {product.description}
            </p>
          </div>
        </div>

        {/* related placeholder */}
        <RelatedProducts products={[]} />
      </div>

      <Footer />
    </div>
  );
};

export default Eshop;
