import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = 'http://207.244.240.126:3000/roles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  create(org: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, org);
  }

  update(id: number, org: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, org);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

