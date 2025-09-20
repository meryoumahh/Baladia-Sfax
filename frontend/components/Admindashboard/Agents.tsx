"use client";

import React, { useState, useEffect } from 'react';
import { getAgentList, registerServiceProvider,  } from '@/app/utils/auth';
import { FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';


interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  serviceCategory: string;
  plain_password: string | null;
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
const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());
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
      // Create agent with the generated password
      const agentData = {
        user: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: password,
          telephone: formData.telephone,
          role: 'agent'
        },
        serviceCategory: formData.serviceCategory,
        plain_password: password  // Store plain password for admin viewing
      };
      
      const response = await fetch('http://localhost:8000/api/auth/agent/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(agentData)
      });
      
      if (response.ok) {
        alert(`Agent créé avec succès!\nMot de passe: ${password}`);
        setShowCreateForm(false);
        setFormData({ firstName: '', lastName: '', email: '', telephone: '', serviceCategory: '' });
        // Refresh the list
        const data = await getAgentList();
        setAgents(data);
      } else {
        throw new Error('Failed to create agent');
      }
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
            <th className="border border-gray-300 p-2">Mot de Passe</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="text-center">
              <td className="border border-gray-300 p-2">{agent.id}</td>
              <td className="border border-gray-300 p-2">{agent.name}</td>
              <td className="border border-gray-300 p-2">{agent.email}</td>
              <td className="border border-gray-300 p-2">{agent.phone || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                {agent.serviceCategory === 'ALL' ? 'Tous Services' :
                 agent.serviceCategory === 'LIGHT' ? 'Éclairage Public' :
                 agent.serviceCategory === 'ROAD' ? 'Routes & Trottoirs' :
                 agent.serviceCategory === 'WATER' ? 'Eau & Assainissement' :
                 agent.serviceCategory === 'SANITATION' ? 'Gestion des Déchets & Propreté' :
                 agent.serviceCategory === 'ELECTRICITY' ? 'Infrastructures Électriques' :
                 agent.serviceCategory === 'TELECOM' ? 'Lignes de Télécommunication' :
                 agent.serviceCategory === 'TRAFFIC' ? 'Feux & Signalisation Routière' :
                 agent.serviceCategory === 'BUILDING' ? 'Entretien des Bâtiments Publics' :
                 agent.serviceCategory === 'PARK' ? 'Parcs & Espaces Verts' :
                 agent.serviceCategory === 'BRIDGE' ? 'Ponts & Passerelles' :
                 agent.serviceCategory === 'EMERGENCY' ? 'Réparations d\'Urgence' :
                 agent.serviceCategory}
              </td>
              <td className="border border-gray-300 p-2">
                {agent.plain_password ? (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">
                      {visiblePasswords.has(agent.id) ? agent.plain_password : '••••••••'}
                    </span>
                    <button
                      onClick={() => {
                        const newVisible = new Set(visiblePasswords);
                        if (visiblePasswords.has(agent.id)) {
                          newVisible.delete(agent.id);
                        } else {
                          newVisible.add(agent.id);
                        }
                        setVisiblePasswords(newVisible);
                      }}
                      className="text-blue-500 hover:text-blue-700 p-1 rounded"
                    >
                      {visiblePasswords.has(agent.id) ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
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
                  <option value="ALL">Tous Services</option>
                  <option value="LIGHT">Éclairage Public</option>
                  <option value="ROAD">Routes & Trottoirs</option>
                  <option value="WATER">Eau & Assainissement</option>
                  <option value="SANITATION">Gestion des Déchets & Propreté</option>
                  <option value="ELECTRICITY">Infrastructures Électriques</option>
                  <option value="TELECOM">Lignes de Télécommunication</option>
                  <option value="TRAFFIC">Feux & Signalisation Routière</option>
                  <option value="BUILDING">Entretien des Bâtiments Publics</option>
                  <option value="PARK">Parcs & Espaces Verts</option>
                  <option value="BRIDGE">Ponts & Passerelles</option>
                  <option value="EMERGENCY">Réparations d'Urgence</option>
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