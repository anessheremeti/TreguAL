import React, { useEffect, useMemo, useRef, useState } from "react";
import { normalizeImageUrl } from "../utils/imageUtils";
import { getApiUrl } from "../config/api";

export default function AdminAdsPage() {
  // =========================
  // API + AUTH
  // =========================
  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // ===== Form State =====
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const fileRef = useRef(null);

  // ===== Cards State (API) =====
  const [ads, setAds] = useState([]);

  const canSubmit = useMemo(() => {
    return title.trim().length >= 3 && !!imageFile && !saving;
  }, [title, imageFile, saving]);

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Ju lutem zgjidhni vetëm foto (image).");
      e.target.value = "";
      return;
    }

    setImageFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const mapAds = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map((x) => {
      // Get raw image URL from API response - handle multiple possible property names
      const rawImageUrl = x.imageUrl || x.ImageUrl || x.image_url || "";
      
      // Normalize image URL - handle both relative and absolute URLs
      const imageUrl = normalizeImageUrl(rawImageUrl);
      
      return {
        id: x.adId || x.ad_id,
        title: x.title || x.Title || "",
        createdAt: (x.createdAt || x.created_at || "").slice(0, 10),
        image: imageUrl || "", // Ensure we always have a string, even if empty
      };
    });
  };

  const loadAds = async () => {
    try {
      setLoadingAds(true);
      const res = await fetch(getApiUrl("/api/ads"));
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Gabim në ngarkim të ads");
      }
      const data = await res.json();
      const mappedAds = mapAds(data);
      setAds(mappedAds);
    } catch (err) {
      console.error("Error loading ads:", err);
      alert("Gabim në ngarkim të ads: " + (err?.message || "Gabim."));
    } finally {
      setLoadingAds(false);
    }
  };

  // LOAD ADS ON MOUNT
  useEffect(() => {
    loadAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (!token) {
      alert("Duhet të jesh i kyqur për të postuar ads.");
      return;
    }

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("title", title.trim());
      fd.append("description", "");
      fd.append("image", imageFile);

      const res = await fetch(getApiUrl("/api/ads"), {
        method: "POST",
        headers: { ...authHeaders }, // MOS vendos Content-Type me dorë te FormData
        body: fd,
      });

      if (!res.ok) {
        let errorMessage = "Gabim gjatë ruajtjes së ad-it.";
        try {
          const errorText = await res.text();
          errorMessage = errorText || errorMessage;
        } catch {
          // If we can't read error text, use default message
        }
        throw new Error(errorMessage);
      }

      // Success - refresh list and reset form
      await loadAds();
      setTitle("");
      removeImage();
    } catch (err) {
      console.error("Error creating ad:", err);
      alert("Gabim: " + (err?.message || "gjatë ruajtjes."));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!id) {
      alert("ID e ad-it mungon.");
      return;
    }

    const confirmed = window.confirm(
      "A je i sigurt që don me e fshi këtë ad? Kjo veprim nuk mund të zhbëhet."
    );
    if (!confirmed) return;

    // Optimistic update
    const prev = ads;
    setAds((p) => p.filter((x) => x.id !== id));

    try {
      const res = await fetch(getApiUrl(`/api/ads/${id}`), {
        method: "DELETE",
        headers: { ...authHeaders },
      });

      if (!res.ok && res.status !== 204) {
        // Rollback nëse dështoi
        setAds(prev);
        let errorMessage = "S'u fshi ad-i.";
        try {
          const errorText = await res.text();
          errorMessage = errorText || errorMessage;
        } catch {
          // If we can't read error text, use default message
        }
        alert(errorMessage);
      }
    } catch (err) {
      // Rollback nëse dështoi
      setAds(prev);
      console.error("Error deleting ad:", err);
      alert("Gabim gjatë fshirjes: " + (err?.message || "Gabim i panjohur."));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin • Ads</h1>
          <p className="text-gray-400 mt-1">
            Posto reklamë + shfaq reklamat si cards (API real).
          </p>
        </div>

        {/* Layout: Form + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ===== Left: Form ===== */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Posto Ad</h2>

              <form onSubmit={onSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Titulli
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="p.sh. Shitet iPhone 13..."
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 3 karaktere.
                  </p>
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Foto
                  </label>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                  />

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={pickFile}
                      className="px-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition"
                    >
                      Zgjidh foton
                    </button>

                    {imageFile ? (
                      <div className="text-sm text-gray-300">
                        <div className="font-medium">{imageFile.name}</div>
                        <div className="text-gray-500 text-xs">
                          {(imageFile.size / 1024).toFixed(0)} KB
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        Asnjë foto e zgjedhur.
                      </div>
                    )}
                  </div>

                  {/* Preview */}
                  <div className="mt-4">
                    {previewUrl ? (
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                        <img
                          src={previewUrl}
                          alt="preview"
                          className="w-full h-56 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 border border-white/10 text-white px-3 py-1.5 rounded-full text-sm transition"
                        >
                          Hiqe
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 h-40 flex items-center justify-center text-gray-500">
                        Preview del këtu.
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-3 rounded-xl font-semibold transition
                    ${
                      canSubmit
                        ? "bg-emerald-500 text-black hover:bg-emerald-400"
                        : "bg-white/10 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {saving ? "Duke ruajtur..." : "Posto"}
                </button>

                {!token && (
                  <p className="text-xs text-amber-300">
                    * S’ka token. POST/DELETE do dështojnë pa login.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* ===== Right: Cards ===== */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-xl font-semibold">Reklamat e postuara</h2>
                <span className="text-sm text-gray-400">
                  Totali: <span className="text-white">{ads.length}</span>
                </span>
              </div>

              {loadingAds ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-10 text-center text-gray-400">
                  Duke ngarkuar...
                </div>
              ) : ads.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-10 text-center text-gray-500">
                  S’ka asnjë ad ende.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {ads.map((ad) => (
                    <div
                      key={ad.id}
                      className="bg-black/25 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition"
                    >
                      <div className="relative bg-black/50">
                        {ad.image? (
                          <>
                            <img
                              src={ad.image}
                              alt={ad.title || "Ad"}
                              className="w-full h-44 object-cover"
                              onError={(e) => {
                                // Hide the broken image and show fallback
                                e.target.style.display = "none";
                                const fallback = e.target.nextElementSibling;
                                if (fallback) {
                                  fallback.style.display = "flex";
                                }
                              }}
                            />
                            <div 
                              className="w-full h-44 flex items-center justify-center text-gray-500 text-sm bg-black/30"
                              style={{ display: "none" }}
                            >
                              <div className="text-center">
                                <div className="text-4xl mb-2">📷</div>
                                <div>Image Not Found</div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-44 flex items-center justify-center text-gray-500 text-sm bg-black/30">
                            <div className="text-center">
                              <div className="text-4xl mb-2">📷</div>
                              <div>No Image Available</div>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-sm text-gray-300">
                            {ad.createdAt}
                          </div>
                          <div className="font-semibold leading-snug">
                            {ad.title}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="text-xs text-gray-400">ID: {ad.id}</div>

                        <button
                          onClick={() => onDelete(ad.id)}
                          className="px-3 py-2 rounded-xl bg-red-500/15 border border-red-500/25 text-red-200 hover:bg-red-500/25 hover:border-red-500/40 transition text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={loadAds}
                className="mt-6 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition text-sm font-semibold"
              >
                Rifresko listën
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
