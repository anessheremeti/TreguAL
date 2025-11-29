import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value)
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    console.log("Form submitted", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-white/10">
        <h1 className="text-3xl font-semibold text-white text-center mb-2">Login</h1>
        <p className="text-slate-300 text-center mb-8">Or sign up for an account</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div>
            <label className="block text-slate-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white placeholder-slate-500 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 border 
              ${errors.email ? "border-red-500" : "border-slate-700"}`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-3 rounded-xl bg-slate-800 text-white placeholder-slate-500 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 border
              ${errors.password ? "border-red-500" : "border-slate-700"}`}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}

            <a href="#" className="text-sm text-blue-400 hover:underline mt-1 inline-block">
              Forgot password?
            </a>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            Log in
          </button>
        </form>

        <p className="text-slate-300 text-center mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
