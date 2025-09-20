import { useState } from "react";
import { FaExclamationTriangle, FaStopwatch, FaCheck, FaTrash } from 'react-icons/fa';
interface ReclamationCardProps {
  id: number;
  titre: string;
  description: string;
  category: string;
  status: string;
  localization: string;
  date: string;
  picture: string;
  onDelete?: (id: number) => void;
}

export default function ReclamationCard({
  id,
  titre,
  description,
  category,
  status,
  localization,
  date,
  picture,
  onDelete,
}: ReclamationCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete?.(id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      {/* Card container */}
      <div className="flex justify-between bg-amber-50 shadow-md rounded-xl overflow-hidden w-full mx-auto mb-6 hover:shadow-lg transition-shadow duration-300 p-4">
        {/* Left column: text info */}
        <div className="flex flex-col justify-center text-start space-y-2 px-3">
          <h2 className="text-2xl font-bold">{titre}</h2>
          
          <p className="text-gray-600 font-medium">{description}</p>
          <div className="flex gap-5">
          <span className="text-gray-500 font-light"> categorie :{category}</span>
          <span className="text-gray-500 font-light">Location: {localization}</span>
          <span className="text-gray-500 font-light">Date Soumission: {new Date(date).toLocaleDateString('fr-FR')}</span></div>
        </div>

        {/* Right column: status + button */}
        <div className="flex flex-col justify-between items-end">
          <span
          className={`px-3 py-1 rounded-full font-semibold text-white ${
            status === "En cours"
              ? "bg-yellow-400"
              : status === "En attente"
              ? "bg-gray-400"
              : "bg-green-500"
          } capitalize flex items-center gap-2`}
        >
          {status === "En cours" && <FaExclamationTriangle />}
          {status === "En attente" && <FaStopwatch />}
          {status === "Résolu" && <FaCheck />}
          
          {status.replace("_", " ")}
        </span>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowPopup(true)}
              className="px-4 py-2 bg-[#113f67] text-white rounded-lg hover:bg-blue-500 transition"
            >
              Voir Photo
            </button>
            {onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                title="Supprimer"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Popup for the picture */}
      {showPopup && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 w-full">
          <div className="bg-white rounded-lg p-4 relative max-w-1/2 w-full">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold text-2xl"
            >
              &times;
            </button>
            <img src={picture} alt={titre} className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}

      {/* Delete confirmation popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cette réclamation ? Cette action est irréversible.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );

/*<div className="flex bg-white shadow-md rounded-xl overflow-hidden max-w-3xl mx-auto mb-6 hover:shadow-lg transition-shadow duration-300">
      {/* Left image 
      <img
        src={picture}
        alt={titre}
        className="w-1/3 object-cover"
      />

      {/* Right content *
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{titre}</h2>
          <p className="text-gray-600 mb-3">{description}</p>

          <div className="flex flex-wrap text-sm text-gray-500 gap-4">
            <span>
              <strong>Category:</strong> {category}
            </span>
            <span>
              <strong>Status:</strong> <span className="capitalize">{status}</span>
            </span>
            <span>
              <strong>Location:</strong> {localization}
            </span>
          </div>
        </div>
      </div>
    </div>*/}