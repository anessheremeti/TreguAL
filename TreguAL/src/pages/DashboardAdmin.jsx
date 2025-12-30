import React, { useState } from "react";
import Sidebar from "./Sidebar";

import SummaryCards from "./SummaryCards";
import UsersList from "./UsersList";
import PostManagement from "./PostManagement";
import AdsManagement from "./AdsManagement";
import Payments from "./Payments";
import Reviews from "./Reviews";

export default function DashboardAdmin() {
  const [page, setPage] = useState("summary");

  // Sidebar i jep sinjal me setPage → duhet me ia dërgu props
  return (
    <div className="flex">
      <Sidebar setPage={setPage} />

      <main className="flex-1 bg-[#0b1120] text-white p-6 md:ml-64">

        {page === "summary" && <SummaryCards />}
        {page === "users" && <UsersList />}
        {page === "posts" && <PostManagement />}
        {page === "ads" && <AdsManagement />}
        {page === "payments" && <Payments />}
        {page === "reviews" && <Reviews />}

      </main>
    </div>
  );
}
