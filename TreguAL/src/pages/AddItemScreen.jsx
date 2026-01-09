import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getApiUrl } from "../config/api";

import React, { useState, useRef } from "react";

export default function CreateListingPage() {
  // =============================
  //  KATEGORITË STATIKE
  // =============================
  const CATEGORY_MAP = {
    Electronics: 1,
    Vehicles: 2,
    "Real Estate": 3,
  };

  const CATEGORY_LIST = Object.keys(CATEGORY_MAP);

  // =============================
  //  STATE
  // =============================
  const [filteredCategories, setFilteredCategories] = useState(CATEGORY_LIST);
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    model: "",
    price: "",
    categoryName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([null, null, null]);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];

  // ======================================
  //   KATEGORIA — SEARCH + DROPDOWN LOGIC
  // ======================================
  const handleCategorySearch = (e) => {
    const value = e.target.value;
    setCategorySearch(value);

    const lower = value.toLowerCase();
    setFilteredCategories(
      CATEGORY_LIST.filter((c) => c.toLowerCase().includes(lower))
    );

    setCategoryOpen(true);
    setHighlightIndex(-1);
  };

  const selectCategory = (name) => {
    setForm((prev) => ({ ...prev, categoryName: name }));
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
      setHighlightIndex((i) => (i < filteredCategories.length - 1 ? i + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : filteredCategories.length - 1));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const cat = filteredCategories[highlightIndex === -1 ? 0 : highlightIndex];
      if (cat) selectCategory(cat);
    }

    if (e.key === "Escape") setCategoryOpen(false);
  };

  // ======================================
  //   OTHER LOGIC (images, validate, submit)
  // ======================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumber = (e) => {
    const { name, value } = e.target;
    if (value === "") return setForm((prev) => ({ ...prev, [name]: "" }));

    const num = Number(value);
    if (num >= 0) {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const triggerImage = (i) => {
    fileInputRefs[i].current.click();
  };

  const handleImage = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => {
      const copy = [...prev];
      copy[i] = file;
      return copy;
    });
  };

  const validate = () => {
    const err = {};

    const hasPhoto = images.some((img) => img !== null);
    if (!hasPhoto) {
      err.images = "Duhet të ngarkosh të paktën 1 foto të produktit.";
    }

    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      err.title = "Titulli është i detyrueshëm.";
    } else if (trimmedTitle.length < 3) {
      err.title = "Titulli duhet të ketë të paktën 3 karaktere.";
    }

    const trimmedDescription = form.description.trim();
    if (!trimmedDescription) {
      err.description = "Përshkrimi është i detyrueshëm.";
    } else if (trimmedDescription.length < 10) {
      err.description = "Përshkrimi duhet të ketë të paktën 10 karaktere.";
    }

    if (!form.brand.trim()) {
      err.brand = "Marka është e detyrueshme.";
    }

    if (!form.categoryName) {
      err.categoryName = "Zgjedh një kategori.";
    }

    const trimmedPhoneNumber = form.phoneNumber.trim();
    if (!trimmedPhoneNumber) {
      err.phoneNumber = "Numri telefonit është i detyrueshëm.";
    }

    if (form.price && Number(form.price) < 0) {
      err.price = "Çmimi duhet të jetë një numër pozitiv.";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Duhet me u kyq (login) para se me postu.");
      return;
    }

    const categoryId = CATEGORY_MAP[form.categoryName] || 1;

    // Create FormData with all required fields
    const formData = new FormData();
    formData.append("CategoryId", String(categoryId));
    formData.append("Title", form.title.trim());
    formData.append("Description", form.description.trim() || "");
    formData.append("PhoneNumber", form.phoneNumber.trim());

    // Add images to FormData
    images.forEach((img) => {
      if (img) {
        formData.append("Images", img);
      }
    });

    try {
      const res = await fetch(
        getApiUrl("/api/posts/create-with-images"),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type header - browser will set it automatically with boundary for FormData
          },
          body: formData,
        }
      );

      if (!res.ok) {
        let errorMessage = "Ndodhi një gabim gjatë krijimit të shpalljes.";
        try {
          const errorData = await res.json();
          // Handle validation errors
          if (errorData.errors) {
            const errorMessages = Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
              .join("\n");
            errorMessage = `Gabim validimi:\n${errorMessages}`;
          } else if (errorData.title) {
            errorMessage = errorData.title;
          } else if (typeof errorData === "string") {
            errorMessage = errorData;
          }
        } catch {
          // If response is not JSON, try to get text
          const text = await res.text();
          if (text) errorMessage = text;
        }
        alert(errorMessage);
        return;
      }

      // Success - redirect to profile
      window.location.href = `/my-profile`;
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Ndodhi një gabim gjatë lidhjes me serverin. Ju lutem provoni përsëri.");
    }
  };


  // Note: Cloudinary upload function removed as it's not being used
  // If needed in the future, implement it separately


  // ======================================
  //         UI RENDER
  // ======================================
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-soft-dark text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-8">Krijo Shpallje të Re</h1>

          {/* IMAGES  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => triggerImage(i)}
                className={`aspect-video bg-white/10 rounded-xl 
        border 
        ${errors.images ? "border-red-500" : "border-white/20"} 
        flex items-center justify-center cursor-pointer overflow-hidden 
        hover:border-blue-400`}
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="text-white/50 text-sm text-center">
                    <div className="text-3xl mb-1">📁</div>
                    Shto Foto
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE + CATEGORY */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* TITLE */}
              <div>
                <label className="text-sm">Titulli i Shpalljes *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Shkruani titullin"
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${
                    errors.title ? "border-red-400" : "border-white/20"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs">{errors.title}</p>
                )}
              </div>

              {/* CATEGORY DROPDOWN */}
              <div className="relative">
                <label className="text-sm">Kategoria *</label>

                <input
                  type="text"
                  value={categorySearch}
                  onChange={handleCategorySearch}
                  onKeyDown={handleCategoryKeys}
                  onFocus={() => setCategoryOpen(true)}
                  placeholder="Kërko kategorinë..."
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${
                    errors.categoryName ? "border-red-400" : "border-white/20"
                  }`}
                />

                {categoryOpen && (
                  <ul className="absolute mt-1 w-full bg-slate-900 border border-white/20 rounded-xl max-h-48 overflow-y-auto z-20">
                    {filteredCategories.map((cat, i) => (
                      <li
                        key={cat}
                        onMouseDown={() => selectCategory(cat)}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-600/40 ${
                          i === highlightIndex ? "bg-blue-600/40" : ""
                        }`}
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

                {form.categoryName && (
                  <p className="text-xs text-white/50 mt-1">
                    Zgjedhur: {form.categoryName}
                  </p>
                )}

                {errors.categoryName && (
                  <p className="text-red-400 text-xs">{errors.categoryName}</p>
                )}
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
                className={`w-full bg-white/10 border px-3 py-2 rounded-xl resize-none ${
                  errors.description ? "border-red-400" : "border-white/20"
                }`}
              />
              {errors.description && (
                <p className="text-red-400 text-xs">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Numri Telefonit *</label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+383 44 123 456"
                className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${
                  errors.phoneNumber ? "border-red-400" : "border-white/20"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-xs">{errors.phoneNumber}</p>
              )}
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
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${
                    errors.brand ? "border-red-400" : "border-white/20"
                  }`}
                />
                {errors.brand && (
                  <p className="text-red-400 text-xs">{errors.brand}</p>
                )}
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
                  className={`w-full bg-white/10 border px-3 py-2 rounded-xl ${
                    errors.price ? "border-red-400" : "border-white/20"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-400 text-xs">{errors.price}</p>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              
             className="bg-blue-600 hover:bg-blue-700 w-full md:w-48 rounded-xl py-3 font-semibold">
              Krijo Shpalljen
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
