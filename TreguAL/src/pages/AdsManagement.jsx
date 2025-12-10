import React, { useState } from "react";

export default function AdsManagement() {
  const pendingAds = [
    {
      id: 1,
      title: "Reklamë për iPhone 13",
      user: "Arben Krasniqi",
      status: "Pending",
      date: "2024-01-22",
      images: [
        "https://via.placeholder.com/300x200?text=Pending+1",
        "https://via.placeholder.com/300x200?text=Pending+1b",
      ],
    },
    {
      id: 4,
      title: "Laptop Gamer MSI",
      user: "Driton P.",
      status: "Pending",
      date: "2024-01-28",
      images: [
        "https://via.placeholder.com/300x200?text=Pending+2",
        "https://via.placeholder.com/300x200?text=Pending+2b",
      ],
    },
  ];

  const activeAds = [
    {
      id: 2,
      title: "Reklamë për banesë me qira",
      user: "Elira Gashi",
      status: "Active",
      date: "2024-02-10",
      images: [
        "https://via.placeholder.com/300x200?text=Active+1",
        "https://via.placeholder.com/300x200?text=Active+1b",
      ],
    },
    {
      id: 5,
      title: "Shitet MacBook Pro 2021",
      user: "Kujtim Berisha",
      status: "Active",
      date: "2024-02-05",
      images: [
        "https://via.placeholder.com/300x200?text=Active+2",
        "https://via.placeholder.com/300x200?text=Active+2b",
      ],
    },
  ];

  const expiredRejectedAds = [
    {
      id: 3,
      title: "Reklamë për veturë (E skaduar)",
      user: "Luan Berisha",
      status: "Expired",
      date: "2023-12-05",
      images: ["https://via.placeholder.com/300x200?text=Expired+1"],
    },
    {
      id: 6,
      title: "Ofertë për TV Samsung (Refuzuar)",
      user: "Besim H.",
      status: "Rejected",
      date: "2023-11-18",
      images: [
        "https://via.placeholder.com/300x200?text=Rejected+1",
        "https://via.placeholder.com/300x200?text=Rejected+1b",
      ],
    },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Ads Management</h1>

      {/* ===== TOP COUNTER CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Pending Counter */}
        <button
          onClick={() =>
            document
              .getElementById("pending-section")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-slate-700 transition"
        >
          <i className="fa-solid fa-clock text-blue-400 text-3xl mb-2"></i>
          <h3 className="text-lg font-semibold">Pending Ads</h3>
          <p className="text-3xl font-bold text-blue-400">
            {pendingAds.length}
          </p>
        </button>

        {/* Active Counter */}
        <button
          onClick={() =>
            document
              .getElementById("active-section")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-slate-700 transition"
        >
          <i className="fa-solid fa-bullhorn text-green-400 text-3xl mb-2"></i>
          <h3 className="text-lg font-semibold">Active Ads</h3>
          <p className="text-3xl font-bold text-green-400">
            {activeAds.length}
          </p>
        </button>

        {/* Expired */}
        <button
          onClick={() =>
            document
              .getElementById("expired-section")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-slate-700 transition"
        >
          <i className="fa-solid fa-ban text-red-400 text-3xl mb-2"></i>
          <h3 className="text-lg font-semibold">Expired / Rejected</h3>
          <p className="text-3xl font-bold text-red-400">
            {expiredRejectedAds.length}
          </p>
        </button>
      </div>

      {/* ============ Pending Ads Section ============ */}
      <Section id="pending-section" title="Pending Ads">
        {pendingAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} type="pending" />
        ))}
      </Section>

      {/* ============ Active Ads Section ============ */}
      <Section id="active-section" title="Active Ads">
        {activeAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} type="active" />
        ))}
      </Section>

      {/* ============ Expired Section ============ */}
      <Section id="expired-section" title="Expired & Rejected">
        {expiredRejectedAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} type="expired" />
        ))}
      </Section>
    </div>
  );
}

/* ---------------- SECTION WRAPPER ---------------- */
function Section({ id, title, children }) {
  return (
    <div id={id} className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex flex-wrap gap-6">{children}</div>
    </div>
  );
}

/* ---------------- AD CARD ---------------- */
function AdCard({ ad, type }) {
  const [index, setIndex] = useState(0);

  const nextImage = () =>
    setIndex((i) => (i + 1) % ad.images.length);
  const prevImage = () =>
    setIndex((i) => (i - 1 + ad.images.length) % ad.images.length);

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col gap-4 w-[300px]">

      {/* Slider */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <img
          src={ad.images[index]}
          className="w-full h-full object-cover"
          alt="ad"
        />

        {/* Prev */}
        {ad.images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
        )}

        {/* Next */}
        {ad.images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold">{ad.title}</h2>

      <p className="text-gray-300 flex items-center gap-2">
        <i className="fa-solid fa-user text-blue-400" /> {ad.user}
      </p>

      <p className="text-gray-300 flex items-center gap-2">
        <i className="fa-solid fa-calendar text-purple-400" /> {ad.date}
      </p>

      <p className="text-gray-300">
        Status:{" "}
        <span className="font-semibold text-yellow-400">
          {ad.status}
        </span>
      </p>

      {/* Pending Buttons */}
      {type === "pending" && (
        <div className="flex gap-3 mt-3">
          <button className="bg-green-600 hover:bg-green-700 transition py-2 px-4 rounded-lg flex-1">
            Approve
          </button>
          <button className="bg-red-600 hover:bg-red-700 transition py-2 px-4 rounded-lg flex-1">
            Reject
          </button>
        </div>
      )}

      {/* Active Buttons */}
      {type === "active" && (
        <div className="flex flex-col gap-3 mt-3">
          {/* <button className="bg-yellow-600 hover:bg-yellow-700 transition py-2 rounded-lg">
            Disable
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg">
            Edit Date
          </button>
          <button className="bg-red-600 hover:bg-red-700 transition py-2 rounded-lg">
            Delete
          </button> */}
        </div>
      )}

      {/* Expired Text */}
      {type === "expired" && (
        <div className="text-gray-500 italic mt-3">
          *This ad is no longer active.
        </div>
      )}
    </div>
  );
}
