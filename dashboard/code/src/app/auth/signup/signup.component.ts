import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  signupError: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;

    this.apiService.signup({ name: name!, email: email!, password: password! }).subscribe({
      next: (res) => {
        console.log('Signup successful', res);

        if (res.token) {
          this.auth.setToken(res.token);
          this.router.navigate(['/tasks']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Signup failed', err);
        this.signupError = 'Signup failed. Please try again.';
      },
    });
	    
	    console.log('Signup data:', this.signupForm.value);
    }
  }
}

