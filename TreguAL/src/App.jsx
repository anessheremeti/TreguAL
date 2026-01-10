import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import EShop from "./pages/E-Shop";
import AddItemScreen from "./pages/AddItemScreen";
import Login from "./pages/Login";
import Sidebar from "./pages/Sidebar";
import DashboardAdmin from "./pages/DashboardAdmin";
import MyPostsPage from "./pages/MyPostsList";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";

import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product-details/:productId" element={<EShop />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />

      {/* AUTHENTICATED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/addItemScreen" element={<AddItemScreen />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Route>

      {/* ADMIN ONLY (role_id === 4) */}
      <Route element={<ProtectedRoute allowedRoles={[4]} />}>
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
