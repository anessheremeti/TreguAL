import { useState, useEffect, useMemo } from "react";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // -----------------------------
  // FETCH PRODUCTS & CATEGORIES
  // -----------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:5104/api/posts"),
          fetch("http://localhost:5104/api/category"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Produkte ose kategori nuk u gjetën");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || "Ndodhi një gabim gjatë fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -----------------------------
  // FILTER BY CATEGORY ID
  // -----------------------------
  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return products;

    return products.filter((product) =>
      selectedCategories.includes(product.categoryId)
    );
  }, [products, selectedCategories]);

  // -----------------------------
  // PAGINATION
  // -----------------------------
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

  // -----------------------------
  // RENDER
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">
        Duke u ngarkuar produktet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-slate-900">
        {error}
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
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories} // dërgo të gjithë kategoritë
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onFilterChange={() => setCurrentPage(1)}
            />
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
