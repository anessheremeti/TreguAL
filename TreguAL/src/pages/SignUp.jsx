import React, { useState } from "react";

export default function SignUp() {
  const API_URL = "http://localhost:5104/api/users"; // <-- ndrysho XXXX me portën e backend-it

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [nib, setNib] = useState("");
  const [errors, setErrors] = useState({});

  const validateName = (v) =>
    !v ? "Name is required" : v.length < 3 ? "Name must be at least 3 characters" : "";
  const validateEmail = (v) =>
    !v ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Invalid email format" : "";
  const validatePhone = (v) =>
    !v ? "Phone is required" : !/^\+?[0-9]{7,15}$/.test(v) ? "Invalid phone format" : "";
  const validatePassword = (v) =>
    !v ? "Password is required" : v.length < 8 ? "Password must be at least 8 characters" : "";
  const validateNib = (v) =>
    !v ? "NIB is required for businesses" : v.length < 8 ? "NIB must be at least 8 characters" : "";

  const roleMap = {
    buyer: 1,
    seller: 2,
    business: 3,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      role: role ? "" : "Please select an option",
      nib: role === "business" ? validateNib(nib) : "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((x) => x)) return;

    const payload = {
      roleId: roleMap[role] ?? 1,
      fullName: name,
      email,
      password,
      phoneNumber: phone,
      businessIdNumber: role === "business" ? nib : null,
      // businessName: role === "business" ? "..." : null, // nëse e shton field në UI
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.log(data);
        alert(data?.message || "Gabim gjatë regjistrimit");
        return;
      }

 console.log("Created user:", data);

// ✅ store userId in cache


alert("U regjistrua me sukses ✅. Po ta dërgojmë emailin për verifikim...");


  



      // optional reset
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setNib("");
      setErrors({});
      window.location.href = "http://localhost:5173/login";

    } catch (err) {
      alert("S’po lidhet me backend. Kontrollo URL/SSL/CORS.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-white/10">
        <h1 className="text-3xl font-semibold text-white text-center mb-2">Sign Up</h1>
        <p className="text-slate-300 text-center mb-8">Create a new account</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: validateName(e.target.value) }));
              }}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white border ${
                errors.name ? "border-red-500" : "border-slate-700"
              }`}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="email@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((p) => ({ ...p, email: validateEmail(e.target.value) }));
              }}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white border ${
                errors.email ? "border-red-500" : "border-slate-700"
              }`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              placeholder="+38344123456"
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((p) => ({ ...p, phone: validatePhone(e.target.value) }));
              }}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white border ${
                errors.phone ? "border-red-500" : "border-slate-700"
              }`}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* ROLE SELECT */}
          <div>
            <label className="block text-slate-300 mb-1">Register As</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setErrors((p) => ({ ...p, role: e.target.value ? "" : "Please select an option" }));
              }}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white border ${
                errors.role ? "border-red-500" : "border-slate-700"
              }`}
            >
              <option value="">Select...</option>
              <option value="business">Business</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* NIB FIELD IF BUSINESS */}
          {role === "business" && (
            <div>
              <label className="block text-slate-300 mb-1">Business Identification Number (NIB)</label>
              <input
                type="text"
                value={nib}
                placeholder="Enter NIB"
                onChange={(e) => {
                  setNib(e.target.value);
                  setErrors((p) => ({ ...p, nib: validateNib(e.target.value) }));
                }}
                className={`w-full p-3 rounded-xl bg-slate-800 text-white border ${
                  errors.nib ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.nib && <p className="text-red-400 text-sm mt-1">{errors.nib}</p>}
            </div>
          )}

          <div>
            <label className="block text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((p) => ({ ...p, password: validatePassword(e.target.value) }));
              }}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white border ${
                errors.password ? "border-red-500" : "border-slate-700"
              }`}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-slate-300 text-center mt-6">
          Already have an account?{" "}
          <a href="http://localhost:5173/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
