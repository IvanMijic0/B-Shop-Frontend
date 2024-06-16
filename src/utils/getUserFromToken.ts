import { jwtDecode } from 'jwt-decode';
import { TokenPayload, User } from './type';

export const getUserFromToken = (): User | null => {
  const token = localStorage.getItem('userToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.user;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
