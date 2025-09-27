import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-permission-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent {
  permissions = [
    { id: 1, name: 'Org One', description: 'Main organization' },
    { id: 2, name: 'Org Two', description: 'Secondary branch' },
  ];

  constructor(private router: Router) {}

  edit(perm: any) {
    this.router.navigate(['/permissions', perm.id, 'edit']);
  }

  delete(perm: any) {
    this.permissions = this.permissions.filter(p => p.id !== perm.id);
  }
}

