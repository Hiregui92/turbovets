import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS, AppSettings } from '../app.config';


export interface Permission {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private apiUrl = `${this.settings.backendUrl}/permissions`;

  constructor(
    private http: HttpClient,
    @Inject(APP_SETTINGS) private settings: AppSettings
  ) {}

  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl);
  }

  getById(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.apiUrl}/${id}`);
  }

  create(org: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.apiUrl, org);
  }

  update(id: number, org: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${this.apiUrl}/${id}`, org);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

