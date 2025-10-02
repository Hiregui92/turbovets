import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PermissionService, Permission } from '../services/permission.service';


@Component({
  standalone: true,
  selector: 'app-permission-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent {
  permissions: Permission[] = [];

  constructor(
    private router: Router, 
    private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.permissionService.getAll().subscribe((data) => {
      this.permissions = data;
    });
  }

  edit(perm: any) {
    this.router.navigate(['/permissions', perm.id, 'edit']);
  }

  delete(perm: any) {
    this.permissions = this.permissions.filter(p => p.id !== perm.id);
  }
}


