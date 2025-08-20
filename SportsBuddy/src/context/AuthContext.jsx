import React, { createContext, useState, useEffect, useContext } from "react";
import { account, ID } from "../services/appwrite.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => { checkUserStatus(); }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email.trim(), password);
      await checkUserStatus();
    } catch (err) {
      throw new Error(parseError(err));
    }
  };

  const register = async (name, email, password) => {
    try {
      await account.create(ID.unique(), email.trim(), password, name?.trim() || undefined);
      await login(email, password);
    } catch (err) {
      throw new Error(parseError(err));
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      throw new Error(parseError(err));
    }
  };

  const checkUserStatus = async () => {
    try {
      const me = await account.get();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const parseError = (err) => {
    const msg = err?.message || "Something went wrong. Please try again.";
    if (/missing required parameter/i.test(msg)) return "Please fill in all required fields.";
    if (/invalid credentials/i.test(msg)) return "Invalid email or password.";
    if (/already.*exists/i.test(msg)) return "This email is already registered.";
    return msg;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
