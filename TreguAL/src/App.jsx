import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage/index";
import Product from "./pages/Product";
import {  Routes, Route } from "react-router";
import EShop from "./pages/E-Shop";
import Login from "./pages/Login";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/e-shop" element={<EShop />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
