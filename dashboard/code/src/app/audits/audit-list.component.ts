import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuditLog } from '../models/audit.model';


@Component({
  standalone: true,
  selector: 'app-audit-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './audit-list.component.html',
})
export class AuditListComponent {
  audits: AuditLog[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAudits().subscribe((data: AuditLog[]) => {
      this.audits = data;
    });
  }
}
