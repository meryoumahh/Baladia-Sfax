/**
 * TypeScript interfaces for type safety
 */

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  role: 'citoyen' | 'agent' | 'admin';
  is_staff: boolean;
  citoyen_profile?: CitoyenProfile;
  agent_profile?: AgentProfile;
}

export interface CitoyenProfile {
  id: number;
  address: string;
  dateOfBirth: string;
  isValid: boolean;
  cin?: string;
}

export interface AgentProfile {
  id: number;
  serviceCategory: ServiceCategory;
  plain_password?: string;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  serviceCategory: string;
  plain_password: string | null;
}

export interface Citoyen {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  isValid: boolean;
  cin: string | null;
}

export interface Reclamation {
  id: number;
  titre: string;
  description: string;
  category: string;
  status: 'En attente' | 'En cours' | 'Résolu';
  localization: string;
  date_soumission: string;
  picture: string;
  agent?: Agent;
  citoyen?: Citoyen;
}

export interface ReclamationStats {
  resolu: number;
  en_cours: number;
  en_attente: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type ServiceCategory = 
  | 'LIGHT' | 'ROAD' | 'WATER' | 'SANITATION' 
  | 'ELECTRICITY' | 'TELECOM' | 'TRAFFIC' 
  | 'BUILDING' | 'PARK' | 'BRIDGE' | 'EMERGENCY' | 'ALL';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  role: string;
  address?: string;
  dateOfBirth?: string;
  cin?: File | null;
  serviceCategory?: ServiceCategory;
}