"use client";
import React, { useState, useEffect } from "react";

interface Step1Props {
  email: string;
  setEmail: (email: string) => void;

  firstName: string;
  setFirstName: (firstName: string) => void;

  lastName: string;
  setLastName: (lastName: string) => void;

  password: string;
  setPassword: (password: string) => void;

  telephone: string;
  setTelephone: (telephone: string) => void;

  onNext: () => void; // callback to go to next step
}

interface ErrorState {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  telephone?: string;
}

const StepOneRegister = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password,
  setPassword,
  telephone,
  setTelephone,
  onNext,
}: Step1Props) => {
  const [error, setError] = useState<ErrorState>({});
  const [conPassword, setConPassword] = useState("");

  // General validation for other fields
  const validate = () => {
    const newErrors: ErrorState = {};

    // First name: required, no digits
    if (!firstName) newErrors.firstName = "First name is required";
    else if (/\d/.test(firstName)) newErrors.firstName = "First name cannot contain digits";

    // Last name: required, no digits
    if (!lastName) newErrors.lastName = "Last name is required";
    else if (/\d/.test(lastName)) newErrors.lastName = "Last name cannot contain digits";

    // Email format
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";

    // Password: at least 8 characters
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";

    // Telephone: exactly 8 digits (Tunisia style)
    if (!telephone) newErrors.telephone = "Telephone is required";
    else if (!/^\d{8}$/.test(telephone)) newErrors.telephone = "Telephone must be 8 digits";

    // Confirm password
    if (!conPassword) newErrors.confirmPassword = "Confirm your password";
    else if (password !== conPassword) newErrors.confirmPassword = "Passwords do not match";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time password validation
  const validatePasswords = () => {
    setError((prev) => {
      const newErrors = { ...prev };
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else newErrors.password = "";

      if (!conPassword) newErrors.confirmPassword = "Confirm your password";
      else if (password !== conPassword) newErrors.confirmPassword = "Passwords do not match";
      else newErrors.confirmPassword = "";

      return newErrors;
    });
  };

  return (
    <div className="w-1/4 mx-auto mt-10 p-10 mb-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Creer un compte!</h2>
      <form className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label className="block mb-1 font-medium text-start mx-5">Prénom :</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.firstName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.firstName && <p className="text-red-500 text-sm mt-1">{error.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-medium text-start mx-5">Nom :</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.lastName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.lastName && <p className="text-red-500 text-sm mt-1">{error.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-start mx-5">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium text-start mx-5">Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePasswords();
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.password ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium text-start mx-5">Confirmer mot de passe :</label>
          <input
            type="password"
            value={conPassword}
            onChange={(e) => {
              setConPassword(e.target.value);
              validatePasswords();
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.confirmPassword ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
          )}
        </div>

        {/* Telephone */}
        <div>
          <label className="block mb-1 font-medium text-start mx-5">Numéro de Téléphone :</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.telephone ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.telephone && <p className="text-red-500 text-sm mt-1">{error.telephone}</p>}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={() => {
            if (validate()) onNext();
          }}
          className="mt-4 bg-[#113F67] text-white font-bold py-2 hover:bg-[#58A0C8] rounded-3xl transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StepOneRegister;
