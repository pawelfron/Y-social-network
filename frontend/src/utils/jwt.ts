import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  user_id: number;
  [key: string]: any;
}

export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.user_id;
  } catch (e) {
    console.error('Error while decoding token:', e);
    return null;
  }
}
