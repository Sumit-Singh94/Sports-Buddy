import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import AdminPanel from "../components/AdminPanel.jsx";

export default function AdminDashboard() {
  const { user } = useAuth();
  if (!user?.prefs?.isAdmin) {
    return <p className="text-sm text-red-600">You do not have admin access.</p>;
    }
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      <p className="text-sm text-gray-600">Manage Sports, Cities, Areas and seed defaults.</p>
      <AdminPanel />
    </div>
  );
}
