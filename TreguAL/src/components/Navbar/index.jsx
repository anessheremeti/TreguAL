import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pageLogo from "../../assets/8df3bd592c22da650b58b166b08590f8ca1cbb49.png";
import burger from "../../assets/Frame 1.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-black px-6 py-5">
         <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className=" font-brand font-bold text-sky-600">Tregu AL</div>

          <ul className="hidden md:flex items-center gap-8 text-white text-[16px] font-medium">
            <li className="cursor-pointer  font-brand font-bold hover:text-gray-300 transition">Home</li>
            <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">E-shop</li>
            <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">Rreth Nesh</li>
            <li className="cursor-pointer font-brand font-bold hover:text-gray-300 transition">Blog</li>
          </ul>

          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-white font-brand font-bold hover:text-gray-300 transition">
              <i className="fa-solid fa-right-to-bracket"></i>
              Login
            </button>

            <img
              src={burger}
              alt="burger"
              className="h-7 w-7 md:hidden cursor-pointer select-none"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

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
                <li className="hover:text-gray-300 transition cursor-pointer">Home</li>
                <li className="hover:text-gray-300 transition cursor-pointer">E-shop</li>
                <li className="hover:text-gray-300 transition cursor-pointer">Rreth Nesh</li>
                <li className="hover:text-gray-300 transition cursor-pointer">Blog</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
