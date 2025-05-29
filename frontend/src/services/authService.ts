import axios from 'axios';
import { getUserIdFromToken } from '../utils/jwt';

export class AuthService {
  private static instance: AuthService | null = null;

  static get_instance(){
    if (!AuthService.instance){
      AuthService.instance = new AuthService();
    }
    return AuthService.instance
  }

  static reset_instance() {
    AuthService.instance = null;
  }


  private baseUrl = process.env.API_URL!;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');

    if (this.accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
    }
  }

  private saveTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async register(username: string, email: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/register`, {
      username,
      email,
      password
    });
    return res.data;
  }

  async login(username: string, password: string) {
    const res = await axios.post(`${this.baseUrl}/login`, {
      username,
      password
    });

    const { access, refresh } = res.data;
    this.saveTokens(access, refresh);
    return res.data;
  }

  async tokenRefresh() {
    if (!this.refreshToken) throw new Error('Brak refresh tokenu');

    const res = await axios.post(`${this.baseUrl}/refresh`, {
      refresh: this.refreshToken
    });

    const { access } = res.data;
    this.saveTokens(access, this.refreshToken!);
    return access;
  }

  async logout() {
    if (!this.refreshToken) return;

    try {
      await axios.post(`${this.baseUrl}/logout`, {
        refresh: this.refreshToken
      });
    } catch (e) {
      console.warn('Logout failed:', e);
    } finally {
      this.clearTokens();
    }
  }

  isLoggedIn() {
    return !!this.accessToken;
  }

  getUserId(){
    if(this.accessToken){
      return getUserIdFromToken(this.accessToken)
    } else {
      return null
    }
  }

  
}
