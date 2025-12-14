import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import burger from "../../assets/Frame 1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NavBar Kryesor (Desktop & Mobile) */}
      <nav className="bg-black px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Titulli */}
          <Link to="/">
            <div className="font-brand font-bold text-sky-600 ...">
              Tregu AL
            </div>
          </Link>

          {/* Navigimi për Desktop */}
          <ul className="hidden md:flex items-center gap-8 text-white text-[16px] font-medium">
            <Link to="/">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                Home
              </li>
            </Link>
            <Link to="/e-shop">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                E-shop
              </li>
            </Link>
            <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
              Rreth Nesh
            </li>
            <Link to="/blog">
              <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">
                Blog
              </li>
            </Link>
          </ul>

          {/* Butoni Login dhe Burger Icon */}
          <div className="flex items-center gap-5">
            <Link to="/login">
              <button className="flex items-center gap-2 text-white font-brand font-bold hover:text-gray-300 transition">
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </button>
            </Link>
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

            {/* Menuja Anësore - Me Link-a dhe mbyllje funksionale */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-black/95 text-white z-50 p-6 shadow-xl flex flex-col gap-6"
            >
              {/* Butoni Mbyll */}
              <button
                className="text-right text-2xl mb-6 hover:text-gray-300 transition"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>

              {/* Lidhjet e Menusë Mobile */}
              <ul className="flex flex-col gap-5 text-lg">
                <Link to="/" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link to="/e-shop" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">
                    E-shop
                  </li>
                </Link>
                <li
                  className="hover:text-gray-300 transition cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Rreth Nesh
                </li>
                <Link to="/blog" onClick={() => setOpen(false)}>
                  <li className="hover:text-gray-300 transition cursor-pointer">
                    Blog
                  </li>
                </Link>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
