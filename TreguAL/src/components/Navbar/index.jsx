import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import burger from "../../assets/Frame 1.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Kontrollo a eshte useri logged in (nga localStorage)
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!token && !!userId);
  };

  useEffect(() => {
    checkAuth();

    // nese localStorage ndryshon ne tab tjeter
    const onStorage = () => checkAuth();
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    localStorage.removeItem("roleId");

    setIsLoggedIn(false);
    setOpen(false);
    navigate("/");
  };

  const goProfile = () => {
    setOpen(false);
    navigate("/my-profile"); // ✅ route i MyProfile
  };

  return (
    <>
      {/* NavBar Kryesor (Desktop & Mobile) */}
      <nav className="bg-black px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Titulli */}
          <Link to="/">
            <div className="font-brand font-bold text-sky-600 ...">Tregu AL</div>
          </Link>

          {/* Navigimi për Desktop */}
          <ul className="hidden md:flex items-center gap-8 text-white text-[16px] font-medium">
            <Link to="/">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                Home
              </li>
            </Link>
            <Link to="/product">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                Products
              </li>
            </Link>
            <Link to="/aboutus">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                Rreth Nesh
              </li>
            </Link>
            <Link to="/blog">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                Blog
              </li>
            </Link>
          </ul>

          {/* Butoni Login/Logout, MyProfile dhe Burger Icon */}
          <div className="flex items-center gap-5">
            {isLoggedIn ? (
              <>
                {/* ✅ MY PROFILE (desktop) */}
                <button
                  onClick={goProfile}
                  className="hidden md:flex items-center gap-2 text-white font-brand font-bold hover:text-sky-400 transition"
                >
                  <i className="fa-solid fa-user"></i>
                  My Profile
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white font-brand font-bold hover:text-gray-300 transition"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 text-white font-brand font-bold hover:text-gray-300 transition">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Login
                </button>
              </Link>
            )}

            <img
              src={burger}
              alt="burger"
              className="h-7 w-7 md:hidden cursor-pointer select-none"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* Menuja Anësore (Mobile) me AnimatePresence */}
      <AnimatePresence>
        {open && (
          <>
            {/* Sfondi/Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menuja Anësore */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-black/95 text-white z-50 p-6 shadow-xl flex flex-col gap-6"
            >
              <button
                className="text-right text-2xl mb-6 hover:text-gray-300 transition"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>

              <ul className="flex flex-col gap-5 text-lg">
                <Link to="/" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">Home</li>
                </Link>
                <Link to="/product" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">
                    Products
                  </li>
                </Link>
                <Link to="/aboutus" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">
                    Rreth Nesh
                  </li>
                </Link>
                <Link to="/blog" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">
                    Blog
                  </li>
                </Link>

                {/* ✅ My Profile + Login/Logout ne mobile */}
                <div className="pt-4 border-t border-white/10">
                  {isLoggedIn ? (
                    <>
                      {/* MY PROFILE (mobile) */}
                      <button
                        onClick={goProfile}
                        className="w-full text-left hover:text-sky-400 transition cursor-pointer"
                      >
                        <i className="fa-solid fa-user mr-2"></i>
                        My Profile
                      </button>

                      {/* LOGOUT (mobile) */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left hover:text-gray-300 transition cursor-pointer mt-4"
                      >
                        <i className="fa-solid fa-right-from-bracket mr-2"></i>
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <div className="hover:text-gray-300 transition cursor-pointer">
                        <i className="fa-solid fa-right-to-bracket mr-2"></i>
                        Login
                      </div>
                    </Link>
                  )}
                </div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
