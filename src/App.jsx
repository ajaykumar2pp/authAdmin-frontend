import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TwoFALogin from "./pages/auth/TwoFALogin";
import TwoFASetup from "./pages/auth/TwoFASetup";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/errors/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* ToastContainer */}
      <ToastContainer />

      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/qr-code" element={<TwoFASetup />} />

        <Route path="/verify-otp/:id" element={<TwoFALogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
