"use client";
import { CreateReclamation } from "@/app/utils/Reclamation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface ComplaintFormData {
  title: string;
  category: string;
  location: string;
  description: string;
  photo: File | null; // single photo
}

const CATEGORIES = [
  'infrastructures critiques', 
  'environnement proprete', 
  'energie electricite', 
  'assainissement eau', 
  'transport stationnement', 
  'trottoirs mobilite douce',
  'voirie routes', 
  'eclairage public',
];

interface FormReclamationProps {
  onBack?: () => void;
}

export default function FormReclamation({ onBack }: FormReclamationProps) {
  const [form, setForm] = useState<ComplaintFormData>({
    title: "",
    category: "",
    location: "",
    description: "",
    photo: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null; // get first file or null
    setForm((prev) => ({ ...prev, photo: file }));
  };

  const isValid = () => {
    return (
      form.title.trim() &&
      form.category &&
      form.location.trim() &&
      form.description.trim()
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValid()) {
      setError("Please fill out all required fields.");
      return;
    }
    setSubmitting(true);

    try {
      // send the single photo like your cin example
      await CreateReclamation(
        form.title,
        form.category,
        form.location,
        form.description,
        form.photo // File | null
      );
      setSuccess(true);
      setForm({
        title: "",
        category: "",
        location: "",
        description: "",
        photo: null,
      });
      onBack?.();
    } catch (err) {
      setError((err as Error).message || "Error submitting complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-1/3 mx-auto p-6 bg-white rounded-xl shadow my-4">
      <button 
        onClick={onBack || (() => window.history.back())} 
        className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        &#8592; Retour au tableau de bord
      </button>
      <h1 className="text-3xl font-bold mb-2">Ajouter Nouvelle Reclamation</h1>
      <p className="text-gray-600 mb-4">Votre Voix, Notre Action!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-semibold text-gray-700">Issue Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Brief description of the issue"
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 focus:border-blue-400 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold text-gray-700">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 focus:border-blue-400 focus:outline-none transition-all duration-200 text-gray-700"
          >
            <option value="">Select issue category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold text-gray-700">Location *</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Street address or intersection"
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 focus:border-blue-400 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-gray-700">Detailed Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Provide a detailed description of the issue..."
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl mt-2 bg-gradient-to-r from-blue-50 to-indigo-50 focus:border-blue-400 focus:outline-none transition-all duration-200 resize-none"
            rows={4}
          />
        </div>

        {/* Photo */}
        <div>
          <label className="font-semibold">Photo</label>
          <div className="border-dashed border-2 border-blue-400 rounded p-4 flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              Click to upload a photo
            </label>
            {form.photo && (
              <span className="text-xs text-gray-700 mt-2">{form.photo.name}</span>
            )}
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Reclamation enregistré</div>}

        <div className="flex gap-4">
          <button
            type="button"
            className="w-1/2 py-2 border rounded text-gray-700"
            onClick={() => {
              setForm({
                title: "",
                category: "",
                location: "",
                description: "",
                photo: null,
              });
              onBack?.();
            }}
            disabled={submitting}
          >
            Retour
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 rounded bg-gradient-to-r from-sky-400 to-blue-300 text-white font-semibold disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Enregistrement..." : "Enregistrer Reclamation"}
          </button>
        </div>
      </form>
    </div>
  );
}
