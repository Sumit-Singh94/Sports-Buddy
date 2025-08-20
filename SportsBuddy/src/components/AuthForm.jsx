import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthForm({ isRegister }) {
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isRegister) await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
    } catch (err) {
      setError(err.message || "Failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-center">{isRegister ? "Create Account" : "Login"}</h2>
      {isRegister && (
        <input name="name" placeholder="Full Name" required value={form.name} onChange={onChange}
               className="w-full px-4 py-2 border rounded-lg" />
      )}
      <input name="email" type="email" placeholder="Email" required value={form.email} onChange={onChange}
             className="w-full px-4 py-2 border rounded-lg" />
      <input name="password" type="password" placeholder="Password" required value={form.password} onChange={onChange}
             className="w-full px-4 py-2 border rounded-lg" />
      <button disabled={busy} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
        {busy ? "Please wait…" : isRegister ? "Register" : "Login"}
      </button>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </form>
  );
}
