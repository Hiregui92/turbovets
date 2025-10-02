import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrganizationService, Organization } from '../services/organization.service';


@Component({
  standalone: true,
  selector: 'app-organization-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './organization-list.component.html'
})
export class OrganizationListComponent {
  organizations: Organization[] = [];

  // Filters
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedCategory: string = 'all';
  
  constructor(private router: Router, private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.getAll().subscribe((data) => {
      this.organizations = data;
    });
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  edit(org: any) {
    this.router.navigate(['/organizations', org.id, 'edit']);
  }

  delete(org: any) {
    this.organizations = this.organizations.filter(o => o.id !== org.id);
  }
}

