import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import React, { useState, useEffect, useRef } from "react";

export default function CreateListingPage() {

  // =============================
  //  KATEGORITË STATIKE
  // =============================
  const CATEGORY_LIST = [
    "Elektronikë",
    "Kompjuterë",
    "Gaming",
    "Kamera",
    "Elektroshtepiake",
    "Pajisje",
    "Veshje për Femra",
    "Veshje për Meshkuj",
    "Veshje për Fëmijë",
    "Këpucë",
    "Bizhuteri",
    "Kozmetikë",
    "Shëndet",
    "Sport",
    "Fitness",
    "Automjete",
    "Pajisje për Vetura",
    "Motorë",
    "Bicikleta",
    "Shtëpi",
    "Mobilje",
    "Kopshtari",
    "Kuzhinë",
    "Artizanat",
    "Libra",
    "Lodra",
    "Material Zyrë",
    "Kafshë",
    "Produkte për Foshnja",
    "Produkte Bujqësie",
    "Produkte Mjekësore",
    "Aksesorë Udhëtimi",
    "Audio",
    "Aksesorë Shtëpie",
    "Pajisje për Pastrim",
    "Vegla Pune",
    "Tjera"
  ];

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
if (!hasPhoto) err.images = "You must upload at least 1 product photo.";


    if (form.title.trim().length < 3)
  err.title = "Titulli duhet të ketë të paktën 3 karaktere.";

if (form.description.trim().length < 10)
  err.description = "Përshkrimi duhet të ketë të paktën 10 karaktere.";

if (!form.brand.trim())
  err.brand = "Marka është e detyrueshme.";

if (!images.some((img) => img !== null))
  err.images = "Duhet të ngarkoni të paktën një foto.";

if (form.price && Number(form.price) < 0)
  err.price = "Çmimi duhet të jetë një numër pozitiv.";


    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("Title", form.title);
    data.append("Description", form.description);
    data.append("Brand", form.brand);
    data.append("Model", form.model);
    data.append("Price", form.price);
    data.append("Category", form.categoryName);

    images.forEach((img) => {
      if (img) data.append("Images", img);
    });

    const res = await fetch("/api/listings", {
      method: "POST",
      body: data,
    });

    if (res.ok) window.location.href = "/my-listings";
  };

  // ======================================
  //         UI RENDER 
  // ======================================

  return (
    <>
    <Navbar/>
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
          className="w-{90%} h-full object-cover"
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
  <p className="text-red-400 text-sm mb-4">
    {errors.images}
  </p>
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
              <label className="text-sm">Kategoria (Opsionale)</label>

              <input
                type="text"
                value={categorySearch}
                onChange={handleCategorySearch}
                onKeyDown={handleCategoryKeys}
                onFocus={() => setCategoryOpen(true)}
                placeholder="Kërko kategorinë..."
                className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-xl"
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
          <button className="bg-blue-600 hover:bg-blue-700 w-full md:w-48 rounded-xl py-3 font-semibold">
            Krijo Shpalljen
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
