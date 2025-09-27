import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuditLog } from '../models/audit.model';


@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://207.244.240.126:3000';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  getAudits(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.baseUrl}/audit-log`);
  }
}
