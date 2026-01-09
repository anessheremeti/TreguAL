import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RelatedProducts from "./RelatedProducts";
import { normalizeImageUrl } from "../utils/imageUtils";

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
          // Normalize the first image URL
          const firstImageUrl = data.images?.[0]
            ? normalizeImageUrl(data.images[0])
            : null;
          setActiveImage(firstImageUrl);
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
              {product.images?.map((img, i) => {
                const normalizedUrl = normalizeImageUrl(img);
                return normalizedUrl ? (
                  <img
                    key={i}
                    src={normalizedUrl}
                    alt="thumb"
                    onClick={() => setActiveImage(normalizedUrl)}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition border 
                          ${activeImage === normalizedUrl
                        ? "border-blue-500 shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300?text=No+Image";
                    }}
                  />
                ) : null;
              })}
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex items-center justify-center shadow-lg w-[450px] h-[37rem]">
              {activeImage && (
                <img
                  src={activeImage}
                  className="w-[450px] h-[450px] object-contain"
                  alt="main"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300?text=No+Image";
                  }}
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
              {[1, 2, 3, 4, 5].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
              <span className="text-sm opacity-70">(top)</span>
            </div>

            <p className="opacity-75 leading-relaxed">
              {product.description}
            </p>

            {/* Butoni Dinamik */}
            <button
              onClick={() => {
                // Pastrojmë numrin nga hapësirat ose karakteret extra (+, -, etj)
                const cleanNumber = product.phoneNumber.replace(/\D/g, '');
                const message = encodeURIComponent(`Përshëndetje, jam i interesuar për: ${product.title}`);
                window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
              }}
              className="bg-green-600 hover:bg-green-500 transition px-8 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2"
            >
              {/* Ikona e WhatsApp (Opsionale) */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.887.002-5.462-4.415-9.89-9.881-9.891-5.446 0-9.884 4.438-9.887 9.887-.001 2.22.634 4.385 1.84 6.274l-.993 3.63 3.74-.981z" />
              </svg>
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
