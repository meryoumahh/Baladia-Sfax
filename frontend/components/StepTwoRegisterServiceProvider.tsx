"use client";
import React, { useState } from "react";

interface StepTwoRegisterServiceProviderProps {
  onSubmit: () => void;
  errors: Record<string, string>;
  
  serviceCategory: string;
  setServiceCategory: (val: string) => void;
}

const StepTwoRegisterServiceProvider: React.FC<StepTwoRegisterServiceProviderProps> = ({
  onSubmit,
  errors,
  
  serviceCategory,
  setServiceCategory,
}) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Inscription Service Provider
      </h2>
      <form className="flex flex-col gap-4">
        

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
            <option value="ALL">ALL</option>
            <option value="LIGHT">LIGHT</option>
            <option value="ROAD">ROAD</option>
            
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
