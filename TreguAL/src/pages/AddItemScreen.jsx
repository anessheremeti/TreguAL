import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getApiUrl } from "../config/api";
import useFetch from "../hooks/useFetch";

export default function AddPostManagement() {
  // =============================
  // FETCH CATEGORIES
  // =============================
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(getApiUrl("/api/category"));

  // =============================
  // CATEGORY MAP + LIST
  // =============================
  const CATEGORY_MAP = useMemo(() => {
    if (!Array.isArray(categories)) return {};
    return categories.reduce((acc, c) => {
      acc[c.name] = c.categoryId; // <-- Përdor fushën e saktë nga API
      return acc;
    }, {});
  }, [categories]);

  const CATEGORY_LIST = useMemo(() => Object.keys(CATEGORY_MAP), [CATEGORY_MAP]);

  // =============================
  // FORM STATE
  // =============================
  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    model: "",
    price: "",
    categoryId: null,
    categoryName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([null, null, null]);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];

  const [categorySearch, setCategorySearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // =============================
  // INIT FILTERED CATEGORIES
  // =============================
  useEffect(() => {
    if (CATEGORY_LIST.length > 0) {
      const firstTen = CATEGORY_LIST.slice(0, 10);
      const others = CATEGORY_LIST.length > 10 ? ["Others"] : [];
      setFilteredCategories([...firstTen, ...others]);
    }
  }, [CATEGORY_LIST]);

  // =============================
  // FORM HELPERS
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumber = (e) => {
    const { name, value } = e.target;
    if (value === "" || Number(value) >= 0) {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const triggerImage = (i) => fileInputRefs[i].current.click();

  const handleImage = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImages((prev) => {
      const copy = [...prev];
      copy[i] = file;
      return copy;
    });
  };

  // =============================
  // CATEGORY SEARCH + SELECTION
  // =============================
  const handleCategorySearch = (e) => {
    const value = e.target.value;
    setCategorySearch(value);

    const lower = value.toLowerCase();
    const matches = CATEGORY_LIST.filter((c) => c.toLowerCase().includes(lower));
    const firstTen = matches.slice(0, 10);
    const others = matches.length > 10 ? ["Others"] : [];
    setFilteredCategories([...firstTen, ...others]);
    setCategoryOpen(true);
    setHighlightIndex(-1);
  };

  const selectCategory = (name) => {
    const id = CATEGORY_MAP[name] || null;
    setForm((prev) => ({ ...prev, categoryId: id, categoryName: name }));
    setCategorySearch(name);
    setCategoryOpen(false);
  };

  const handleCategoryKeys = (e) => {
    if (!categoryOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setCategoryOpen(true);
      return;
    }

    if (!filteredCategories.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i < filteredCategories.length - 1 ? i + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) =>
        i > 0 ? i - 1 : filteredCategories.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const cat =
        filteredCategories[highlightIndex === -1 ? 0 : highlightIndex];
      if (cat) selectCategory(cat);
    }

    if (e.key === "Escape") setCategoryOpen(false);
  };

  // =============================
  // VALIDATION
  // =============================
  const validate = () => {
    const err = {};
    if (!images.some(Boolean)) err.images = "Duhet të ngarkosh të paktën 1 foto.";
    if (!form.title.trim()) err.title = "Titulli është i detyrueshëm.";
    if (form.title.trim().length < 3)
      err.title = "Titulli min. 3 karaktere.";
    if (!form.description.trim())
      err.description = "Përshkrimi është i detyrueshëm.";
    if (form.description.trim().length < 10)
      err.description = "Min. 10 karaktere.";
    if (!form.brand.trim()) err.brand = "Marka është e detyrueshme.";
    if (!form.categoryId) err.categoryName = "Zgjidh një kategori të vlefshme.";
    if (!form.phoneNumber.trim())
      err.phoneNumber = "Numri telefonit është i detyrueshëm.";
    if (form.price && Number(form.price) < 0)
      err.price = "Çmimi duhet pozitiv.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // =============================
  // SUBMIT
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Duhet login.");

    const formData = new FormData();
    formData.append("CategoryId", String(form.categoryId));
    formData.append("Title", form.title.trim());
    formData.append("Description", form.description.trim());
    formData.append("PhoneNumber", form.phoneNumber.trim());
    if (form.brand) formData.append("Brand", form.brand);
    if (form.model) formData.append("Model", form.model);
    if (form.price) formData.append("Price", form.price);

    images.forEach((img) => img && formData.append("Images", img));

    try {
      const res = await fetch(
        getApiUrl("/api/posts/create-with-images"),
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        return alert(text || "Gabim gjatë krijimit të postit.");
      }

      window.location.href = "/my-profile";
    } catch (err) {
      console.error(err);
      alert("Gabim gjatë lidhjes me serverin.");
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-soft-dark text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Krijo Shpallje të Re</h1>

          {/* IMAGE UPLOAD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => triggerImage(i)}
                className={`aspect-video bg-white/10 rounded-xl border ${errors.images ? "border-red-500" : "border-white/20"} flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-400`}
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="text-white/50 text-sm text-center">
                    <div className="text-3xl mb-1">📁</div>Shto Foto
                  </div>
                )}
                <input
                  ref={fileInputRefs[i]}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(i, e)}
                  className="hidden"
                />
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="text-red-400 text-sm mb-4">{errors.images}</p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE + CATEGORY */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm">Titulli i Shpalljes *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Shkruani titullin"
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${errors.title ? "border-red-400" : "border-white/20"}`}
                />
                {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
              </div>

              <div className="relative">
                <label className="text-sm">Kategoria *</label>
                <input
                  type="text"
                  value={categorySearch}
                  onChange={handleCategorySearch}
                  onKeyDown={handleCategoryKeys}
                  onFocus={() => setCategoryOpen(true)}
                  placeholder="Kërko kategorinë..."
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${errors.categoryName ? "border-red-400" : "border-white/20"}`}
                />
                {categoryOpen && (
                  <ul className="absolute mt-1 w-full bg-slate-900 border border-white/20 rounded-xl max-h-48 overflow-y-auto z-20">
                    {filteredCategories.map((cat, i) => (
                      <li
                        key={cat}
                        onMouseDown={() => selectCategory(cat)}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-600/40 ${i === highlightIndex ? "bg-blue-600/40" : ""}`}
                      >
                        {cat}
                      </li>
                    ))}
                    {filteredCategories.length === 0 && (
                      <li className="px-3 py-2 text-white/40 text-sm">
                        Nuk ka rezultate
                      </li>
                    )}
                  </ul>
                )}
                {form.categoryName && <p className="text-xs text-white/50 mt-1">Zgjedhur: {form.categoryName}</p>}
                {errors.categoryName && <p className="text-red-400 text-xs">{errors.categoryName}</p>}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm">Përshkrimi i Shpalljes *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Përshkruaj artikullin"
                className={`w-full bg-white/10 border px-3 py-2 rounded-xl resize-none ${errors.description ? "border-red-400" : "border-white/20"}`}
              />
              {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
            </div>

            <div>
              <label className="text-sm">Numri Telefonit *</label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+383 44 123 456"
                className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${errors.phoneNumber ? "border-red-400" : "border-white/20"}`}
              />
              {errors.phoneNumber && <p className="text-red-400 text-xs">{errors.phoneNumber}</p>}
            </div>

            {/* BRAND + MODEL + PRICE */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm">Brendi *</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Brendi"
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${errors.brand ? "border-red-400" : "border-white/20"}`}
                />
                {errors.brand && <p className="text-red-400 text-xs">{errors.brand}</p>}
              </div>

              <div>
                <label className="text-sm">Modeli</label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="Modeli"
                  className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <label className="text-sm">Çmimi (€)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleNumber}
                  placeholder="0"
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${errors.price ? "border-red-400" : "border-white/20"}`}
                />
                {errors.price && <p className="text-red-400 text-xs">{errors.price}</p>}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-48 rounded-xl py-3 font-semibold"
            >
              Krijo Shpalljen
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
