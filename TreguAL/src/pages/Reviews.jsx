import React from "react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      reviewer: "Arben Krasniqi",
      reviewedUser: "Elira Gashi",
      rating: 5,
      comment: "Shumë korrekte dhe komunikim i shkëlqyer!",
    },
    {
      id: 2,
      reviewer: "Luan Berisha",
      reviewedUser: "Ardian Morina",
      rating: 3,
      comment: "Mund të ishte më i shpejtë në përgjigje.",
    },
    {
      id: 3,
      reviewer: "Erza H.",
      reviewedUser: "Driton P.",
      rating: 4,
      comment: "Produkt i mirë, pak vonesë në dërgesë.",
    },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      <div className="flex flex-wrap gap-6">
        {reviews.map((rev) => (
          <ReviewCard key={rev.id} review={rev} />
        ))}
      </div>
    </div>
  );
}

/* ---------- CARD COMPONENT ---------- */
function ReviewCard({ review }) {
  // Krijojmë yjet për rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fa-solid fa-star ${
        i < review.rating ? "text-yellow-400" : "text-gray-500"
      }`}
    ></i>
  ));

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-[300px] flex flex-col gap-4">
      {/* Reviewer */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-user text-blue-400"></i>
        <span className="font-semibold">{review.reviewer}</span>
      </div>

      {/* Reviewed User */}
      <div className="flex items-center gap-2 text-gray-300">
        <i className="fa-solid fa-user-check text-green-400"></i>
        <span>Reviewed: {review.reviewedUser}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 text-yellow-400 text-xl">
        {stars}
      </div>

      {/* Comment */}
      <p className="text-gray-300 italic">"{review.comment}"</p>

      {/* Delete Button */}
      <button className="mt-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2">
        <i className="fa-solid fa-trash"></i>
        Delete Review
      </button>
    </div>
  );
}
