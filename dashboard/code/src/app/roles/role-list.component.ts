// src/app/roles/role-list/role-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleService, Role } from '../services/role.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      this.roles = data;
    });
    // this.api.getRoles().subscribe(res => this.roles = res);
  }

  deleteRole(id: number) {
    /*this.api.deleteRole(id).subscribe(() => {
      this.roles = this.roles.filter(r => r.id !== id);
    });*/
  }
}

