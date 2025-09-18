import React, { useEffect, useState } from 'react';
import { getCitoyenList, validateCitoyen } from '@/app/utils/auth';

interface Citoyen {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  isValid: boolean;
  cin: string | null;
}

const Citoyens = () => {
  const [citoyens, setCitoyens] = useState<Citoyen[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchCitoyens();
  }, []);

  const fetchCitoyens = async () => {
    try {
      const data = await getCitoyenList();
      console.log('Citoyens data:', data);
      setCitoyens(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching citoyens:', error);
      setLoading(false);
    }
  };

  const handleValidate = async (citoyenId: number) => {
    try {
      console.log('Validating citoyen ID:', citoyenId);
      await validateCitoyen(citoyenId);
      fetchCitoyens();
    } catch (error) {
      console.error('Error validating citoyen:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Nom</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Téléphone</th>
              <th className="border border-gray-300 p-2">Adresse</th>
              <th className="border border-gray-300 p-2">Date de Naissance</th>
              <th className="border border-gray-300 p-2">CIN</th>
              <th className="border border-gray-300 p-2">Validation</th>
            </tr>
          </thead>
          <tbody>
            {citoyens.map((citoyen) => (
              <tr key={citoyen.id}>
                <td className="border border-gray-300 p-2">{citoyen.name}</td>
                <td className="border border-gray-300 p-2">{citoyen.email}</td>
                <td className="border border-gray-300 p-2">{citoyen.phone}</td>
                <td className="border border-gray-300 p-2">{citoyen.address}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(citoyen.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {citoyen.cin ? (
                    <button
                      onClick={() => {
                        const imageUrl = citoyen.cin!.startsWith('http') 
                          ? citoyen.cin! 
                          : `http://localhost:8000${citoyen.cin!.startsWith('/') ? '' : '/'}${citoyen.cin!}`;
                        setSelectedImage(imageUrl);
                      }}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition text-sm"
                    >
                      Voir CIN
                    </button>
                  ) : (
                    <span className="text-gray-400">Aucune</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {citoyen.isValid ? (
                    <button className="bg-green-500 text-white px-3 py-1 rounded cursor-default">
                      Validé
                    </button>
                  ) : (
                    <button
                      onClick={() => handleValidate(citoyen.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Valider
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              alt="CIN" 
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
    </div>
  );
};

export default Citoyens;