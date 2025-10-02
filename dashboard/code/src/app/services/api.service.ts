import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS, AppSettings } from '../app.config';
import { AuditLog } from '../models/audit.model';



@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = `${this.settings.backendUrl}`;

  constructor(
    private http: HttpClient,
    @Inject(APP_SETTINGS) private settings: AppSettings
  ) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  getAudits(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseUrl}/audit-log`);
  }
}
