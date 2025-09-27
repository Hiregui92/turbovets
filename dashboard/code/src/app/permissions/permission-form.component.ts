
// src/app/permissions/permission-form/permission-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-permission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './permission-form.component.html',
})
export class PermissionFormComponent implements OnInit {
  permissionForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  isEdit = false;
  permissionId!: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /*this.permissionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.permissionId) {
      this.isEdit = true;
      this.api.getPermissions().subscribe(perms => {
        const perm = perms.find(p => p.id === this.permissionId);
        if (perm) this.permissionForm.patchValue(perm);
      });
    }*/
  }

  onSubmit() {
    if (this.permissionForm.invalid) return;
    const data = this.permissionForm.value;

    /*if (this.isEdit) {
      this.api.updatePermission(this.permissionId, data).subscribe(() => this.router.navigate(['/permissions']));
    } else {
      this.api.createPermission(data).subscribe(() => this.router.navigate(['/permissions']));
    }*/
  }
}

