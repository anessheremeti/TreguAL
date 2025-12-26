import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setPage }) {
  const [open, setOpen] = useState(false); // default closed on mobile
  const [active, setActive] = useState("summary");

  const navigate = useNavigate();

  const menu = [
    { id: "summary", label: "Summary Cards", icon: "fa-solid fa-chart-pie" },
    { id: "users", label: "Lista e përdoruesve", icon: "fa-solid fa-users" },
    { id: "posts", label: "Post Management", icon: "fa-solid fa-list" },
    { id: "ads", label: "Ads Management", icon: "fa-solid fa-bullhorn" },
    { id: "payments", label: "Payments", icon: "fa-solid fa-money-bill" },
    { id: "reviews", label: "Reviews", icon: "fa-solid fa-star" },
    {
      id: "logout",
      label: "Logout",
      icon: "fa-solid fa-right-from-bracket"
    }
  ];

  const handleLogout = () => {
    // fshiji te dhenat e login
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");

    setOpen(false); // mbylle sidebar ne mobile
    navigate("/");  // shkon ne Home
  };

  return (
    <>
      {/* BURGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 p-3 bg-slate-900 text-white rounded-lg z-50 text-xl"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white 
          flex flex-col py-6 px-4 transition-all duration-300
          ${open ? "w-64 left-0" : "w-0 -left-64"}
          md:w-64 md:left-0
          fixed top-0 z-40
        `}
      >
        <h1
          className={`text-2xl font-bold mb-10 ml-2 transition-all
            ${open ? "opacity-100" : "opacity-0 md:opacity-100"}
          `}
        >
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  handleLogout();
                  return;
                }

                setActive(item.id);
                setPage(item.id);
                setOpen(false); // mbylle menynë në mobile
              }}
              className={`
                flex items-center py-3 px-4 rounded-xl transition-all gap-3
                ${
                  active === item.id
                    ? "bg-white text-[#3C3DBF] font-semibold"
                    : "hover:bg-white/20"
                }
              `}
            >
              <i className={`${item.icon} text-xl`} />

              <span
                className={`
                  transition-all whitespace-nowrap
                  ${open ? "opacity-100" : "opacity-0 md:opacity-100"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
