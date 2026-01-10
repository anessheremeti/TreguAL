import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { normalizeImageUrl } from "../utils/imageUtils";

const RelatedProducts = ({ categoryId, currentPostId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchRelated = async () => {
      try {
        // Kujdes: Sigurohu që porta 5104 është e saktë për Backend-in tënd
        const res = await fetch(`http://localhost:5104/api/Related/${categoryId}?excludeId=${currentPostId}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Related Data:", data); // Debug për të parë emrat e fushave (postId apo post_id)
          setProducts(data);
        }
      } catch (err) {
        console.error("Gabim gjatë marrjes së produkteve:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [categoryId, currentPostId]);

  if (loading || products.length === 0) return null;

  return (
    <div className="w-full py-16 bg-[#0D0F1A]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-white text-2xl font-bold tracking-tight">Produkte të ngjashme</h2>
        <div className="flex gap-2">
          <button className="p-1 bg-white/10 hover:bg-white/20 rounded transition text-white">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 bg-white/10 hover:bg-white/20 rounded transition text-white">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          // Kontrollojmë të gjitha variantet e mundshme të ID-së
          const pId = product.postId || product.post_id || product.PostId;

          return (
            // Te RelatedProducts.jsx ndrysho Link-un kështu:
            <Link
              to={`/product-details/${product.postId || product.post_id || product.PostId}`}
              key={product.postId || product.post_id}
              className="group cursor-pointer block"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Pjesa tjetër e kodit të imazhit dhe titullit */}
              <div className="bg-white rounded-sm aspect-square flex items-center justify-center p-8 mb-4 overflow-hidden">
                <img
                  src={normalizeImageUrl(product.images?.[0]?.imageUrl || product.images?.[0])}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white text-center font-medium">{product.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;