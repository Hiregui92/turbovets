// auth.service.ts
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private userId = 'user_id';
  private user: any = null;

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  setUser(user: any) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userId, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userId);
  }

  clearUserId(): void {
    localStorage.removeItem(this.userId);
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwt_decode(token);
      console.log(decoded);

      if (!decoded.exp) {
        return false; // token inválido
      }

      // exp viene en segundos, no en milisegundos
      const isExpired = Date.now() >= decoded.exp * 1000;
      console.log(isExpired);
      return !isExpired;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  hasPermission(permission: string): boolean {
    if (!this.user?.role?.permissions) return false;
    return this.user.role.permissions.some((p: any) => p.name === permission);
  }
}

