"use client";
import React from 'react'
import { useState , useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
const Page = () => {
  
  const [agenceId, setAgenceId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [rate, setRate] = useState("");
  const [packages, setPackages] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  
  const [errors, setErrors] = useState<Record<string, string>>({});



  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!agenceId) newErrors.agenceId = "Agence ID is required";
    if (!businessName) newErrors.businessName = "Business name is required";
    if (!contactInfo) newErrors.contactInfo = "Contact info is required";
    if (!location) newErrors.location = "Location is required";
    if (!rate || isNaN(Number(rate))) newErrors.rate = "Rate must be a number";
    if (!packages) newErrors.packages = "Packages field cannot be empty";
    if (!serviceCategory) newErrors.serviceCategory = "Please select a service category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    alert("Step 3 is valid! Submitting data...");
    // 👉 Send this data to backend or move to next step
  };

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("signupData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  if (!userData) return <p>No data found. Please go back.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register - Step 2</h2>
      <form className="flex flex-col gap-4">
        {/* Agence ID */}
        <div>
          <label className="block mb-1 font-medium">Agence ID</label>
          <input
            type="text"
            value={agenceId}
            onChange={(e) => setAgenceId(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.agenceId ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.agenceId && <p className="text-red-500 text-sm mt-1">{errors.agenceId}</p>}
        </div>

        {/* Business Name */}
        <div>
          <label className="block mb-1 font-medium">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.businessName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
        </div>

       

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.location ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Rate */}
       

        {/* Service Category */}
        <div>
          <label className="block mb-1 font-medium">Service Category</label>
          <select
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.serviceCategory ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          >
            <option value="">-- Select a category --</option>
            <option value="TOUR_GUIDE">Tour Guide</option>
            <option value="TRANSPORT">Transport</option>
            <option value="ACCOMMODATION">Accommodation</option>
            <option value="RESTAURANTCAFFE">Restaurant/Café</option>
          </select>
          {errors.serviceCategory && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceCategory}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={next}
          className="mt-4 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </form>
    </div>
  )
}

export default Page