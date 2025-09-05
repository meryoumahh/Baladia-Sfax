// StepTwoRegisterClient.tsx
"use client";
import React, { useState } from "react";
interface Step2Props {
    address: string;
    setAddress: (email: string) => void; // setter function from parent
    
    dateOfBirth: string;    
    setDateOfBirth: (dateOfBirth: string) => void;



    telephone: string;
    setTelephone: (telephone: string) => void;

    cin: File | null;
    setCin: (cin: File | null) => void;


    onSubmit: () => void; // callback to submit the form
  
}
interface PreferenceOption {
    value: string;
    label: string;
}
const StepTwoRegisterClient = ({ address, setAddress, dateOfBirth, setDateOfBirth, telephone, setTelephone, cin, setCin,  onSubmit  }: Step2Props) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    

    const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!address) newErrors.address = "Address is required";

    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    if (!telephone) newErrors.telephone = "Telephone is required";
    else if (!/^[0-9]{8}$/.test(telephone))
      newErrors.telephone = "Telephone must be 8 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const validation = async() => {
        if (!validate()) return;
        alert("Step 2 is valid! Submitting data...");}


     // Fixed handlePreferenceChange function
    

  // Helper function to get maximum allowed date (18 years ago from today)
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Inscription Client</h2>
      <form className="flex flex-col gap-4">
        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
          <div>
          <label className="block mb-1 font-medium">Carte CIN</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setCin(e.target.files[0]);
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.profilePicture ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>
          )}
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            max={getMaxDate()}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.dateOfBirth ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">You must be at least 18 years old</p>
        </div>

        
        



        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          className="mt-4 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </form>
    </div>














    /*<div>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={() => alert(`Email: ${address}`)}>Submit</button>
    </div>*/
  );
};
export default StepTwoRegisterClient;