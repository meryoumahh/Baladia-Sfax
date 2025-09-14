"use client";

import React, { useState, useEffect } from 'react';
import { getAgentList } from '@/app/utils/auth';

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
if (loading) return <p>Loading agents...</p>;
  return (
    <>
   <h1 className="text-2xl font-bold mb-4">Agents List</h1>
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
      </>
  )
}

export default Agents