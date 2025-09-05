"use client";
import React, { useState } from "react";

interface StepTwoRegisterServiceProviderProps {
  onSubmit: () => void;
  errors: Record<string, string>;
  agenceId: string;
  setAgenceId: (val: string) => void;
  businessName: string;
  setBusinessName: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  serviceCategory: string;
  setServiceCategory: (val: string) => void;
}

const StepTwoRegisterServiceProvider: React.FC<StepTwoRegisterServiceProviderProps> = ({
  onSubmit,
  errors,
  agenceId,
  setAgenceId,
  businessName,
  setBusinessName,
  location,
  setLocation,
  serviceCategory,
  setServiceCategory,
}) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Inscription Service Provider
      </h2>
      <form className="flex flex-col gap-4">
        {/* Agence ID */}
        <div>
          <label className="block mb-1 font-medium">Agence ID</label>
          <input
            type="text"
            value={agenceId}
            onChange={(e) => setAgenceId(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.agenceId
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.agenceId && (
            <p className="text-red-500 text-sm mt-1">{errors.agenceId}</p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label className="block mb-1 font-medium">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.businessName
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.location
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Service Category */}
        <div>
          <label className="block mb-1 font-medium">Service Category</label>
          <select
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.serviceCategory
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-400"
            }`}
          >
            <option value="">-- Select a category --</option>
            <option value="TOUR_GUIDE">Guide Touristique</option>
            <option value="TRANSPORT">Transportation</option>
            <option value="ACCOMMODATION">Accommodation</option>
            <option value="RESTAURANTCAFFE">Restaurant & Cafe</option>
          </select>
          {errors.serviceCategory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.serviceCategory}
            </p>
          )}
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
  );
};

export default StepTwoRegisterServiceProvider;
