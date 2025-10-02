import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS, AppSettings } from '../app.config';


export interface Organization {
  id?: number;
  name: string;
  description?: string;

  parent?: Organization | null;
  children?: Organization[];
}

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private apiUrl = `${this.settings.backendUrl}/organizations`;

  constructor(
    private http: HttpClient,
    @Inject(APP_SETTINGS) private settings: AppSettings
  ) {}

  getAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl);
  }

  getById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/${id}`);
  }

  create(org: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.apiUrl, org);
  }

  update(id: number, org: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/${id}`, org);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

