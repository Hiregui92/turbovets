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

  ngOnInit() {}

  onSubmit() {
    if (this.permissionForm.invalid) return;
    const data = this.permissionForm.value;
  }
}

