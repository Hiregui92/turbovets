// auth.service.ts
import { Injectable } from '@angular/core';

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
    console.log(token);
    // Aquí puedes decodificar y validar expiración si quieres
    return !!token;
  }

  hasPermission(permission: string): boolean {
    if (!this.user?.role?.permissions) return false;
    return this.user.role.permissions.some((p: any) => p.name === permission);
  }
}

