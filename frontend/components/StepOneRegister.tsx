// Step1.tsx
"use client";
import React, { useState } from "react";
interface Step1Props {
    role: string;
    setRole: (role: string) => void; // setter function from parent
    
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




const StepOneRegister = ({ role, setRole, email, setEmail, firstName, setFirstName, lastName, setLastName, password , setPassword, telephone, setTelephone , onNext } : Step1Props) => {
  
    const [error, setError] = useState<Record<string, string>>({});
    // Validation function
    const validate = () => {
    const newErrors: Record<string, string> = {};

    // First name: required, no digits
    if (!firstName) newErrors.firstName = "First name is required";
    else if (/\d/.test(firstName))
      newErrors.firstName = "First name cannot contain digits";

    // Last name: required, no digits
    if (!lastName) newErrors.lastName = "Last name is required";
    else if (/\d/.test(lastName))
      newErrors.lastName = "Last name cannot contain digits";

    // Email format
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    // Password: at least 8 characters
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    // Telephone: exactly 8 digits (Tunisia style)
    if (!telephone) newErrors.telephone = "Telephone is required";
    else if (!/^[0-9]{8}$/.test(telephone))
      newErrors.telephone = "Telephone must be 8 digits";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  
  
  
  
  
    return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.firstName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.firstName && (
            <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.lastName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.lastName && (
            <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.password ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        {/* Telephone */}
        <div>
          <label className="block mb-1 font-medium">Telephone</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error.telephone ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {error.telephone && (
            <p className="text-red-500 text-sm mt-1">{error.telephone}</p>
          )}
        </div>

        {/* Profile Picture 
        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfilePicture(e.target.files ? e.target.files[0] : null)
            }
            className="w-full"
          />
        </div>*/}

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => {
                setRole(e.target.value)
                console.log(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="client">Client</option>
            <option value="service_provider">Service Provider</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={
            
            onNext

          }
          className="mt-4 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  );
};
export default StepOneRegister;