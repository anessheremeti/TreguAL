import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage/index";
import Product from "./pages/Product";
import {  Routes, Route } from "react-router";
import EShop from "./pages/E-Shop";
import AddItemScreen from "./pages/AddItemScreen";
import Login from "./pages/Login";
import Sidebar from "./pages/Sidebar";
import DashboardAdmin from "./pages/DashboardAdmin";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/addItemScreen" element={<AddItemScreen />} />
      <Route path="/e-shop" element={<EShop />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/dashboardAdmin" element={<DashboardAdmin />} />

    </Routes>
    </>
  );
}

export default App;
