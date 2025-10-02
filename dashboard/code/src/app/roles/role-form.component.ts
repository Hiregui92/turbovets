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

  ngOnInit() {}

  onSubmit() {
    if (this.roleForm.invalid) return;
    const data = this.roleForm.value;
  }
}

