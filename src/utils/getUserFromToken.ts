import { jwtDecode } from 'jwt-decode';

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export const getUserFromToken = (): User | null => {
  const token = localStorage.getItem('userToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode<User>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
