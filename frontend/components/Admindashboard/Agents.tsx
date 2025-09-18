"use client";

import React, { useState, useEffect } from 'react';
import { getAgentList, registerServiceProvider,  } from '@/app/utils/auth';
import { FaPlus } from 'react-icons/fa';


interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  serviceCategory: string;
}

const Agents = () => {
const [agents, setAgents] = useState<Agent[]>([]);
const [loading, setLoading] = useState(true);
const [showCreateForm, setShowCreateForm] = useState(false);
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  serviceCategory: ''
});
     useEffect(() => {
        const fetchAgent = async () => {
          try {
            const data = await getAgentList();
            setAgents(data); // adjust if API returns {data: [...]}
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAgent();
      }, []);

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const password = generatePassword();
    
    try {
      await registerServiceProvider(
        formData.firstName,
        formData.lastName,
        formData.email,
        password,
        formData.telephone,
        'agent',
        formData.serviceCategory
      );
      alert(`Agent créé avec succès!\nMot de passe: ${password}`);
      setShowCreateForm(false);
      setFormData({ firstName: '', lastName: '', email: '', telephone: '', serviceCategory: '' });
      // Refresh the list
      const data = await getAgentList();
      setAgents(data);
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Erreur lors de la création de l\'agent');
    }
  };
if (loading) return <div className="text-center p-4">Loading...</div>;
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Agents</h3>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FaPlus size={14} /> Ajouter Agent
        </button>
      </div>
      
      {agents.length === 0 ? (
        <p>Aucun agent trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Service Category</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="text-center">
              <td className="border border-gray-300 p-2">{agent.id}</td>
              <td className="border border-gray-300 p-2">{agent.name}</td>
              <td className="border border-gray-300 p-2">{agent.email}</td>
              <td className="border border-gray-300 p-2">{agent.phone || "N/A"}</td>
              <td className="border border-gray-300 p-2">{agent.serviceCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      )}
      
      {/* Create Agent Form Popup */}
      {showCreateForm && (
        <div 
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowCreateForm(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Créer un Agent</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Prénom de l'agent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de l'agent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input 
                  type="tel" 
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Numéro de téléphone"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Catégorie de Service</label>
                <select 
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="ALL">ALL</option>
                  <option value="LIGHT">LIGHT</option>
                  <option value="ROAD">ROAD</option>
                </select>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Créer Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </>
  )
}

export default Agents