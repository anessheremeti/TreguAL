import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage/index";
import Product from "./pages/Product";
import {  Routes, Route } from "react-router";
import EShop from "./pages/E-Shop";
import AddItemScreen from "./pages/AddItemScreen";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<Product />} />
      <Route path="/addItemScreen" element={<AddItemScreen />} />
    </Routes>
    </>
  );
}

export default App;
