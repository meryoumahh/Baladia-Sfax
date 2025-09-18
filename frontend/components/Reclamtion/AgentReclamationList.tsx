import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Reclamation {
  id: number;
  titre: string;
  description: string;
  category: string;
  status: string;
  date_soumission: string;
  localization: string;
  picture: string;
}

const AgentReclamationList = () => {
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReclamation, setSelectedReclamation] = useState<Reclamation | null>(null);

  useEffect(() => {
    fetchReclamations();
  }, []);

  const fetchReclamations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reclamation/agent-reclamation-list/', {
        withCredentials: true
      });
      setReclamations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reclamations:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (reclamationId: number, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:8000/api/reclamation/status/${reclamationId}/`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      fetchReclamations();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-4">Mes Réclamations Assignées</h2>
      <div className="bg-white rounded-lg p-4">
        {reclamations.length === 0 ? (
          <p>Aucune réclamation assignée.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Titre</th>
                  <th className="border border-gray-300 p-2">Catégorie</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Localisation</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Image</th>
                  <th className="border border-gray-300 p-2">Détails</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reclamations.map((reclamation) => (
                  <tr key={reclamation.id}>
                    <td className="border border-gray-300 p-2">{reclamation.titre}</td>
                    <td className="border border-gray-300 p-2">{reclamation.category}</td>
                    <td className="border border-gray-300 p-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        reclamation.status === 'Résolu' ? 'bg-green-100 text-green-800' :
                        reclamation.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reclamation.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">{reclamation.localization}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(reclamation.date_soumission).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {reclamation.picture ? (
                        <button
                          onClick={() => {
                            const imageUrl = reclamation.picture.startsWith('http') 
                              ? reclamation.picture 
                              : `http://localhost:8000${reclamation.picture.startsWith('/') ? '' : '/'}${reclamation.picture}`;
                            setSelectedImage(imageUrl);
                          }}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition text-sm"
                        >
                          Voir Image
                        </button>
                      ) : (
                        <span className="text-gray-400">Aucune</span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => setSelectedReclamation(reclamation)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition text-sm"
                      >
                        Détails
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => updateStatus(reclamation.id, 'En cours')}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition text-xs"
                          disabled={reclamation.status === 'En cours'}
                        >
                          En cours
                        </button>
                        <button
                          onClick={() => updateStatus(reclamation.id, 'Résolu')}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition text-xs"
                          disabled={reclamation.status === 'Résolu'}
                        >
                          Résolu
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Image Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-3xl">
            <img 
              src={selectedImage} 
              alt="Reclamation" 
              className="max-w-full max-h-full object-contain"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      
      {/* Details Popup */}
      {selectedReclamation && (
        <div 
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedReclamation(null)}
        >
          <div 
            className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">{selectedReclamation.titre}</h3>
            
            <div className="space-y-3">
              <div>
                <strong>Description:</strong>
                <p className="mt-1 text-gray-700">{selectedReclamation.description}</p>
              </div>
              
              <div>
                <strong>Catégorie:</strong>
                <span className="ml-2">{selectedReclamation.category}</span>
              </div>
              
              <div>
                <strong>Localisation:</strong>
                <span className="ml-2">{selectedReclamation.localization}</span>
              </div>
              
              <div>
                <strong>Date de soumission:</strong>
                <span className="ml-2">{new Date(selectedReclamation.date_soumission).toLocaleString()}</span>
              </div>
              
              <div>
                <strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  selectedReclamation.status === 'Résolu' ? 'bg-green-100 text-green-800' :
                  selectedReclamation.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedReclamation.status}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedReclamation(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentReclamationList;