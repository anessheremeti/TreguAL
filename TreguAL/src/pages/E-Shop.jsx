import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { normalizeImageUrl } from "../utils/imageUtils";
import RelatedProducts from "../pages/RelatedProducts.jsx";

const Eshop = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // Fetch product details
  // =========================
  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5104/api/posts/${productId}`);
        if (!res.ok) throw new Error("Produkti nuk u gjet");

        const data = await res.json();

        if (isMounted) {
          setProduct(data);

          const rawImage =
            data.images?.[0] || data.postImages?.[0] || data.imageUrl;

          setActiveImage(
            rawImage ? normalizeImageUrl(rawImage) : "https://via.placeholder.com/450?text=Pa+Imazh"
          );
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => { isMounted = false; };
  }, [productId]);

  useEffect(() => window.scrollTo(0, 0), [productId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0D0F1A] text-white">Duke u ngarkuar...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#0D0F1A] text-red-400">{error}</div>;

  // =========================
  // Extract categoryId safely
  // =========================
  const categoryId = product?.categoryId ?? product?.category_id ?? null;
  const currentPostId = product?.postId ?? product?.post_id ?? null;

  return (
    <div className="font-brand bg-[#0D0F1A] text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* IMAGES */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              {product.images?.map((img, i) => {
                const url = normalizeImageUrl(img);
                return url && (
                  <img
                    key={i}
                    src={url}
                    alt="thumb"
                    onClick={() => setActiveImage(url)}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition border ${
                      activeImage === url
                        ? "border-blue-500 shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
                  />
                );
              })}
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex items-center justify-center shadow-lg w-[450px] h-[37rem]">
              {activeImage && (
                <img
                  src={activeImage}
                  className="w-[450px] h-[450px] object-contain"
                  alt="main"
                  onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
                />
              )}
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="max-w-xl space-y-8">
            <h1 className="text-3xl lg:text-4xl font-semibold">{product.title}</h1>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}
              <span className="text-sm opacity-70">(top)</span>
            </div>

            <p className="opacity-75 leading-relaxed">{product.description}</p>

            <button
              onClick={() => {
                const cleanNumber = product.phoneNumber?.replace(/\D/g, "") || "";
                const message = encodeURIComponent(`Përshëndetje, jam i interesuar për: ${product.title}`);
                window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
              }}
              className="bg-green-600 hover:bg-green-500 transition px-8 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2"
            >
              Kontakto Shitësin
            </button>

            <p className="text-sm opacity-80">
              Telefon: <span className="font-semibold">{product.phoneNumber}</span>
            </p>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {categoryId && currentPostId && (
          <div className="mt-20">
            <RelatedProducts
              categoryId={categoryId}
              currentPostId={currentPostId}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Eshop;
