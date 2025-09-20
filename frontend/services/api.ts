/**
 * Centralized API service layer
 */
import axios, { AxiosResponse } from 'axios';
import { User, Agent, Citoyen, Reclamation, ReclamationStats, LoginCredentials, RegisterData } from '../types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/auth/';
const RECLAMATION_API_URL = process.env.NEXT_PUBLIC_RECLAMATION_API_URL || 'http://localhost:8000/api/reclamation/';

// Create axios instance with default configuration
const apiClient = axios.create({
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await apiClient.post(`${API_BASE_URL}login/`, credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(`${API_BASE_URL}logout/`);
  },

  getUserInfo: async (): Promise<User> => {
    const response = await apiClient.get(`${API_BASE_URL}user-info/`);
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch(`${API_BASE_URL}user-info/`, userData);
    return response.data;
  },

  registerCitoyen: async (data: RegisterData): Promise<void> => {
    const formData = new FormData();
    formData.append('user', JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      telephone: data.telephone,
      role: 'citoyen',
    }));
    
    if (data.address) formData.append('address', data.address);
    if (data.dateOfBirth) formData.append('dateOfBirth', data.dateOfBirth);
    if (data.cin) formData.append('cin', data.cin);

    await apiClient.post(`${API_BASE_URL}citoyen/signup/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// User Management API
export const userAPI = {
  getAgents: async (): Promise<Agent[]> => {
    const response = await apiClient.get(`${API_BASE_URL}listAgent/`);
    return response.data;
  },

  getCitoyens: async (): Promise<Citoyen[]> => {
    const response = await apiClient.get(`${API_BASE_URL}listCitoyen/`);
    return response.data;
  },

  validateCitoyen: async (citoyenId: number): Promise<void> => {
    await apiClient.post(`${API_BASE_URL}validateCitoyen/${citoyenId}/`);
  },
};

// Reclamation API
export const reclamationAPI = {
  getUserReclamations: async (): Promise<Reclamation[]> => {
    const response = await apiClient.get(`${RECLAMATION_API_URL}user-reclamations/`);
    return response.data;
  },

  getAgentReclamations: async (): Promise<Reclamation[]> => {
    const response = await apiClient.get(`${RECLAMATION_API_URL}agent-reclamation-list/`);
    return response.data;
  },

  getUserStats: async (): Promise<ReclamationStats> => {
    const response = await apiClient.get(`${RECLAMATION_API_URL}stats/`);
    return response.data;
  },

  updateStatus: async (reclamationId: number, status: string): Promise<void> => {
    await apiClient.patch(`${RECLAMATION_API_URL}status/${reclamationId}/`, { status });
  },

  assignAgent: async (reclamationId: number, agentId: number): Promise<void> => {
    await apiClient.patch(`${RECLAMATION_API_URL}assignAgent/${reclamationId}/`, { agent: agentId });
  },
};

// Export default API client for custom requests
export default apiClient;