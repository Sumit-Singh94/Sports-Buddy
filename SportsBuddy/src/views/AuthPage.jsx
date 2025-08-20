import React from "react";
import AuthForm from "../components/AuthForm.jsx";

export default function AuthPage({ isRegister = false }) {
  return (
    <div className="max-w-md mx-auto">
      <AuthForm isRegister={isRegister} />
      <p className="text-center text-sm mt-3 text-gray-600">
        {isRegister ? "Already have an account? " : "New here? "}
        <a className="text-blue-600 hover:underline" href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Login" : "Register"}
        </a>
      </p>
    </div>
  );
}
