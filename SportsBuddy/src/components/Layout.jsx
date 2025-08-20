import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold">Sports Buddy</Link>
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                {user.prefs?.isAdmin ? <Link to="/admin" className="hover:underline">Admin</Link> : null}
                <button onClick={logout} className="px-3 py-1 rounded-lg bg-gray-800 text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      <footer className="text-center text-xs text-gray-500 py-6">© {new Date().getFullYear()} Sports Buddy</footer>
    </div>
  );
}
