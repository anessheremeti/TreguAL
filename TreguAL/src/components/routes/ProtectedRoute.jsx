import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  // =============================
  // AUTH SOURCE OF TRUTH
  // =============================
  const token = localStorage.getItem("token");
  const rawRoleId = localStorage.getItem("roleId");

  // =============================
  // NORMALIZATION & SAFETY
  // =============================
  const roleId = rawRoleId ? Number(rawRoleId) : null;
  const isValidRole = Number.isFinite(roleId);

  console.log("ProtectedRoute → roleId:", roleId);

  // =============================
  // AUTH CHECK
  // =============================
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isValidRole) {
    return <Navigate to="/login" replace />;
  }

  // =============================
  // ROLE-BASED ACCESS
  // =============================
  if (Array.isArray(allowedRoles) && !allowedRoles.includes(roleId)) {
    return <Navigate to="/" replace />;
  }

  // =============================
  // ACCESS GRANTED
  // =============================
  return <Outlet />;
}
