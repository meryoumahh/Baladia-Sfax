import axios from "axios";

export const getUserStats = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/reclamation/stats/', {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    throw error;
  }
};