import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage/index";
import Product from "./pages/Product";
import { Routes, Route } from "react-router";
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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/addItemScreen" element={<AddItemScreen />} />
        <Route path="/product-details/:productId" element={<EShop />} />
        <Route path="/my-posts" element={<MyPostsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product" element={<Product />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  );
}

export default App;
