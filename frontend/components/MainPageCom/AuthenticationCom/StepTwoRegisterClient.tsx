"use client";
import React, { useState } from "react";

interface Step2Props {
  address: string;
  setAddress: (address: string) => void;

  dateOfBirth: string;
  setDateOfBirth: (dateOfBirth: string) => void;

  telephone: string;
  setTelephone: (telephone: string) => void;

  cin: File | null;
  setCin: (cin: File | null) => void;

  onSubmit: () => void; // callback to submit the form
}

interface ErrorState {
  address?: string;
  dateOfBirth?: string;
  telephone?: string;
  cin?: string;
}

const StepTwoRegisterClient = ({
  address,
  setAddress,
  dateOfBirth,
  setDateOfBirth,
  telephone,
  setTelephone,
  cin,
  setCin,
  onSubmit,
}: Step2Props) => {
  const [errors, setErrors] = useState<ErrorState>({});

  // Validation function
  const validate = () => {
    const newErrors: ErrorState = {};

    if (!address) newErrors.address = "Address is required";

    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    if (!telephone) newErrors.telephone = "Telephone is required";
    else if (!/^[0-9]{8}$/.test(telephone))
      newErrors.telephone = "Telephone must be 8 digits";

    if (!cin) newErrors.cin = "CIN is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time validation on field change
  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (!value) setErrors((prev) => ({ ...prev, address: "Address is required" }));
    else setErrors((prev) => ({ ...prev, address: "" }));
  };

  const handleDateChange = (value: string) => {
    setDateOfBirth(value);
    if (!value) setErrors((prev) => ({ ...prev, dateOfBirth: "Date of birth is required" }));
    else setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
  };

  const handleTelephoneChange = (value: string) => {
    setTelephone(value);
    if (!value) setErrors((prev) => ({ ...prev, telephone: "Telephone is required" }));
    else if (!/^[0-9]{8}$/.test(value))
      setErrors((prev) => ({ ...prev, telephone: "Telephone must be 8 digits" }));
    else setErrors((prev) => ({ ...prev, telephone: "" }));
  };

  const handleCinChange = (file: File | null) => {
    setCin(file);
    if (!file) setErrors((prev) => ({ ...prev, cin: "CIN is required" }));
    else setErrors((prev) => ({ ...prev, cin: "" }));
  };

  // Helper function to get maximum allowed date (18 years ago from today)
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6"></h2>
      <form className="flex flex-col gap-4">
        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* CIN */}
        <div>
          <label className="block mb-1 font-medium">Carte CIN</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCinChange(e.target.files ? e.target.files[0] : null)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.cin ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.cin && <p className="text-red-500 text-sm mt-1">{errors.cin}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date de naissance</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => handleDateChange(e.target.value)}
            max={getMaxDate()}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.dateOfBirth ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">l'age supérieur à 18 ans</p>
        </div>

        
        {/* Submit Button */}
        <button
          type="button"
          onClick={() => {
            if (validate()) onSubmit();
          }}
          className="mt-4 bg-[#113F67] text-white font-bold py-2 hover:bg-[#58A0C8] transition-colors rounded-full"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StepTwoRegisterClient;
