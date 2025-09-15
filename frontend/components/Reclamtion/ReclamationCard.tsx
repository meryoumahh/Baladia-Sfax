import { useState } from "react";
interface ReclamationCardProps {
  titre: string;
  description: string;
  category: string;
  status: string;
  localization: string;
  picture: string;
}

export default function ReclamationCard({
  titre,
  description,
  category,
  status,
  localization,
  picture,
}: ReclamationCardProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* Card container */}
      <div className="flex justify-between bg-white shadow-md rounded-xl overflow-hidden w-full mx-auto mb-6 hover:shadow-lg transition-shadow duration-300 p-4">
        {/* Left column: text info */}
        <div className="flex flex-col justify-center text-start space-y-2 px-3">
          <h2 className="text-2xl font-bold">{titre}</h2>
          <span className="text-gray-500 font-medium">{category}</span>
          <p className="text-gray-600">{description}</p>
          <span className="text-gray-500">Location: {localization}</span>
          {/*<span className="text-gray-400 text-sm">Date uploaded: {date}</span>*/}
        </div>

        {/* Right column: status + button */}
        <div className="flex flex-col justify-between items-end">
          <span className={`px-3 py-1 rounded-lg font-semibold text-white ${
            status === "in_progress"
              ? "bg-yellow-400"
              : status === "pending"
              ? "bg-gray-400"
              : "bg-green-500"
          } capitalize`}>
            {status.replace("_", " ")}
          </span>

          <button
            onClick={() => setShowPopup(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Voir Photo
          </button>
        </div>
      </div>

      {/* Popup for the picture */}
      {showPopup && (
      <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-4 relative max-w-lg w-full">
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