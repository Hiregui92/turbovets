import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/*
export interface Organization {
  id?: number;
  name: string;
  description?: string;
}
*/

export interface Organization {
  id?: number;
  name: string;
  description?: string;

  parent?: Organization | null;     // referencia al padre
  children?: Organization[];        // lista de hijos
}

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  // private baseUrl = 'http://207.244.240.126:3000';
  //
  private apiUrl = 'http://207.244.240.126:3000/organizations';

  constructor(private http: HttpClient) {}

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

