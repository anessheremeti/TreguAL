import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API = "http://localhost:5104";

export default function MyProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [myPosts, setMyPosts] = useState([]);

  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  // ✅ ID robust (mbulon camelCase + PascalCase)
  const getPostId = (x) =>
    x?.postId ?? x?.PostId ?? x?.id ?? x?.Id ?? x?.postID ?? x?.PostID ?? null;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        setLoading(true);

        // profile
        const resUser = await fetch(`${API}/api/users/me`, {
          headers: { ...authHeaders },
        });
        if (!resUser.ok) throw new Error("S’po mundem me marr profilin");
        const u = await resUser.json();

        setProfile({
          fullName: u.fullName ?? "",
          email: u.email ?? "",
          phoneNumber: u.phoneNumber ?? "",
        });

        // my posts
        const resPosts = await fetch(`${API}/api/posts/me`, {
          headers: { ...authHeaders },
        });
        if (!resPosts.ok) throw new Error("S’po mundem me marr postimet");
        const p = await resPosts.json();

        // ✅ NORMALIZE: gjithmonë e krijojmë postId
        const normalized = (Array.isArray(p) ? p : []).map((x) => ({
          ...x,
          postId: getPostId(x),
        }));

        setMyPosts(normalized);
      } catch (e) {
        console.error(e);
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const save = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Ruajtja dështoi");

      let updated = null;
      try {
        updated = await res.json();
      } catch {
        updated = null;
      }

      if (updated) {
        setProfile({
          fullName: updated.fullName ?? profile.fullName,
          email: updated.email ?? profile.email,
          phoneNumber: updated.phoneNumber ?? profile.phoneNumber,
        });
      }

      const newFullName = updated?.fullName ?? profile.fullName;
      const newEmail = updated?.email ?? profile.email;
      const newPhone = updated?.phoneNumber ?? profile.phoneNumber;

      localStorage.setItem("fullName", newFullName);
      localStorage.setItem("email", newEmail);
      localStorage.setItem("phoneNumber", newPhone);

      setEditMode(false);
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (postId) => {
    if (!postId) {
      alert("Post ID mungon (undefined).");
      return;
    }

    const ok = window.confirm("A je i sigurt që don me e fshi këtë postim?");
    if (!ok) return;

    try {
      const res = await fetch(`${API}/api/posts/${postId}`, {
        method: "DELETE",
        headers: { ...authHeaders },
      });

      const text = await res.text();
      if (!res.ok)
        throw new Error(`Fshirja dështoi (${res.status}) ${text || ""}`);

      setMyPosts((prev) => prev.filter((p) => p.postId !== postId));
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-white/60 animate-pulse" />
          <div className="h-4 w-4 rounded-full bg-white/60 animate-pulse [animation-delay:150ms]" />
          <div className="h-4 w-4 rounded-full bg-white/60 animate-pulse [animation-delay:300ms]" />
          <span className="text-white/70 ml-2">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
     <>
     // <Navbar />
    <div className="min-h-screen bg-black text-white">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              My Profile
            </h1>
            <p className="text-white/60 mt-1">
              Menaxho të dhënat e tua dhe postimet.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/addItemScreen")}
              className="px-4 py-2 rounded-xl bg-sky-500/90 hover:bg-sky-500 transition font-semibold shadow-lg shadow-sky-500/20"
            >
              + Add New Post
            </button>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition font-semibold"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={save}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 transition font-semibold disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition font-semibold disabled:opacity-60"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-7 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              onChange={onChange}
              disabled={!editMode}
            />
            <Field
              label="Email"
              name="email"
              value={profile.email}
              onChange={onChange}
              disabled={!editMode}
              type="email"
            />
            <Field
              label="Phone Number"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={onChange}
              disabled={!editMode}
            />
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
            <div className="text-sm text-white/60">
              Tip: Kliko{" "}
              <span className="text-white/80 font-semibold">Edit</span> për me
              ndryshu të dhënat.
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* My posts */}
        <div className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-xl md:text-2xl font-bold">My Posts</h2>
            <span className="text-white/60 text-sm">
              {myPosts.length} postime
            </span>
          </div>

          {myPosts.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Ti s’ke ende postime.
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myPosts.map((post, idx) => (
                <div
                  key={`${post.postId ?? "noid"}-${post.createdAt ?? ""}-${idx}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-xl hover:bg-white/10 transition"
                >
                  {/* image */}
                  {post.images?.[0]?.imageUrl ? (
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={`${API}${post.images[0].imageUrl}`}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-44 w-full bg-gradient-to-br from-white/5 to-white/0 border-b border-white/10 flex items-center justify-center text-white/40">
                      No image
                    </div>
                  )}

                  {/* content */}
                  <div className="p-5">
                    <div className="font-bold text-lg line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-white/70 text-sm mt-2 line-clamp-3">
                      {post.description}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-white/60">
                        Phone:{" "}
                        <span className="text-white/80">
                          {post.phoneNumber || "-"}
                        </span>
                      </div>

                      <button
                        onClick={() => deletePost(post.postId)}
                        className="text-sm font-semibold text-red-400 hover:text-red-300 transition"
                      >
                        Delete ✕
                      </button>
                    </div>

                    {/* ✅ HAPE për 5 sekonda për me pa id */}
                    {/* <div className="mt-2 text-[11px] text-white/30">ID: {post.postId}</div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
     </>
  );
}

function Field({ label, name, value, onChange, disabled, type = "text" }) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-white/60">{label}</div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={[
          "w-full rounded-xl px-4 py-3 outline-none transition",
          "border border-white/10 bg-black/30 text-white placeholder:text-white/30",
          disabled
            ? "opacity-70 cursor-not-allowed"
            : "focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/20",
        ].join(" ")}
        placeholder={label}
      />
    </div>
  );
}
