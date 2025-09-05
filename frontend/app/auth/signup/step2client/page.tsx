"use client";
import React from 'react'
import { useState , useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {registerUser} from '../../../utils/auth';
const Page = () => {
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("signupData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);


  const preferencesOptions = [
    { value: "AUTRE", label: "Autre" },
    { value: "AVENTURE", label: "Voyage d'aventure" },
    { value: "PLAGE", label: "Plage & Détente" },
    { value: "CULTURE", label: "Circuits Culturels & Historiques" },
    { value: "NATURE", label: "Nature & Randonnée" },
    { value: "ROAD_TRIP", label: "Voyage en Route" },
    { value: "LUXE", label: "Voyage de Luxe" },
    { value: "CROISIERE", label: "Croisières" },
    { value: "BIEN_ETRE", label: "Bien-être & Spa" },
    { value: "GASTRONOMIE", label: "Gastronomie & Expériences Culinaires" },
    { value: "FESTIVALS", label: "Festivals & Événements" },
    { value: "SPORT", label: "Sports & Activités en Plein Air" },
    { value: "FAMILLE", label: "Voyage en Famille" }
  ];

  
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!address) newErrors.address = "Address is required";

    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    if (!paymentMethod) newErrors.paymentMethod = "Please select a payment method";

    if (!preferences) newErrors.preferences = "Preferences cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const next = async() => {
    if (!validate()) return;
    alert("Step 2 is valid! Submitting data...");
    // 👉 Here you can call your backend API or move to Step 3
    try {
        await registerUser(userData.firstName,userData.lastName, userData.email, userData.password, userData.telephone, userData.role , address , dateOfBirth , paymentMethod , preferences);
        alert("client registration works successfully");

        // Additional logic after successful login here
      } catch (e) {
        alert(
          "Failed to register client with info: \n" +
           userData.firstName + ", " +
           userData.lastName + ", " +
           userData.email + ", " +
           userData.password + ", " +
           userData.telephone + ", " +
           userData.role );
        console.error(e);
      }
  };
  // Handle preference checkbox changes
  const handlePreferenceChange = (value: string) => {
    setPreferences(prev => {
      if (prev.includes(value)) {
        // Remove the preference if it's already selected
        return prev.filter(item => item !== value);
      } else {
        // Add the preference if it's not selected
        return [...prev, value];
      }
    });
  };

  // Helper function to get maximum allowed date (18 years ago from today)
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };
  return (
<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register - Step 2 - {userData?.firstName} </h2>
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

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.paymentMethod ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
            }`}
          >
            <option value="">-- Select a payment method --</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="Paypal">PayPal</option>
            <option value="Cash">Cash</option>
            <option value="Virement_Bancaire">Virement Bancaire</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
          )}
        </div>

        {/* Preferences */}
        <div>
          <label className="block mb-2 font-medium">Travel Preferences</label>
          <p className="text-gray-600 text-sm mb-3">Select all that apply:</p>
          <div className="max-h-48 overflow-y-auto border rounded-md p-3 bg-gray-50">
            <div className="grid grid-cols-1 gap-2">
              {preferencesOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.includes(option.value)}
                    onChange={() => handlePreferenceChange(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          {preferences.length > 0 && (
            <p className="text-blue-600 text-xs mt-1">
              {preferences.length} preference{preferences.length > 1 ? 's' : ''} selected
            </p>
          )}
          {errors.preferences && (
            <p className="text-red-500 text-sm mt-1">{errors.preferences}</p>
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
    </div>  )
}

export default Page