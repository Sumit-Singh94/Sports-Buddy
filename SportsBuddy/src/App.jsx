import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AuthPage from "./views/AuthPage.jsx";
import UserDashboard from "./views/UserDashboard.jsx";
import AdminDashboard from "./views/AdminDashboard.jsx";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<AuthPage isRegister={false} />} />
        <Route path="/register" element={<AuthPage isRegister />} />
        <Route path="/dashboard" element={<Protected><UserDashboard /></Protected>} />
        <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Layout>
  );
}
