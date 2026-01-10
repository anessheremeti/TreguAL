import { useState, useEffect, useMemo } from "react";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
// Importo mjetet ndihmëse për fotot (ashtu si te AdminAdsPage)
import { normalizeImageUrl } from "../utils/imageUtils"; 

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]); // State i ri për Ads
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Funksoni për mapimin e Ads (i njejtë me atë në Admin)
  const mapAds = (data) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((x) => ({
      id: x.adId || x.ad_id,
      title: x.title || x.Title || "",
      image: normalizeImageUrl(x.imageUrl || x.ImageUrl || x.image_url || ""),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Shtojmë fetch edhe për ads
        const [productsRes, categoriesRes, adsRes] = await Promise.all([
          fetch("http://localhost:5104/api/posts"),
          fetch("http://localhost:5104/api/category"),
          fetch("http://localhost:5104/api/ads"), // API i reklamave
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Produkte ose kategori nuk u gjetën");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        // I marrim ads nëse api-ja kthen sukses
        let adsData = [];
        if (adsRes.ok) {
          const rawAds = await adsRes.json();
          adsData = mapAds(rawAds);
        }

        setProducts(productsData);
        setCategories(categoriesData);
        setAds(adsData); 
      } catch (err) {
        setError(err.message || "Ndodhi një gabim gjatë fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return products;
    return products.filter((product) =>
      selectedCategories.includes(product.categoryId)
    );
  }, [products, selectedCategories]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">
        Duke u ngarkuar produktet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            Showing {filteredProducts.length} results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onFilterChange={() => setCurrentPage(1)}
            />

            {/* --- SEKSIONI I ADS --- */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Reklamat</h3>
              <div className="space-y-4">
                {ads.length > 0 ? (
                  ads.map((ad) => (
                    <div key={ad.id} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all hover:border-emerald-500/50">
                      <img 
                        src={ad.image} 
                        alt={ad.title} 
                        className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-200 truncate">{ad.title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">S'ka reklama aktualisht.</p>
                )}
              </div>
            </div>
            {/* --------------------- */}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ProductGrid products={paginatedProducts} />

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {paginatedProducts.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Nuk ka produkte që përputhen me filtrat e tua
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductCatalog;