import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-organization-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './organization-form.component.html'
})
export class OrganizationFormComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Organization saved:', this.form.value);
    }
  }
}

