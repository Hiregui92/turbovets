// src/app/roles/role-form/role-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './role-form.component.html',
})
export class RoleFormComponent implements OnInit {
  roleForm = this.fb.group({
    name: ['', Validators.required],
  });

  isEdit = false;
  roleId!: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /*this.roleId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.roleId) {
      this.isEdit = true;
      this.api.getRoles().subscribe(roles => {
        const role = roles.find(r => r.id === this.roleId);
        if (role) this.roleForm.patchValue(role);
      });
    }*/
  }

  onSubmit() {
    if (this.roleForm.invalid) return;

    const data = this.roleForm.value;

    /*if (this.isEdit) {
      this.api.updateRole(this.roleId, data).subscribe(() => this.router.navigate(['/roles']));
    } else {
      this.api.createRole(data).subscribe(() => this.router.navigate(['/roles']));
    }*/
  }
}

