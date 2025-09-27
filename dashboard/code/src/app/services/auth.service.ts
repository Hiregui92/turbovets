// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private userId = 'user_id';

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
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Aquí puedes decodificar y validar expiración si quieres
    return !!token;
  }
}

