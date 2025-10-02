import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  onLogin() {
    const payload = { email: this.email, password: this.password };
    this.apiService.login(payload).subscribe({
        next: (res: any) => {
          // Save JWT in localStorage
          this.authService.setToken(res.access_token);
          this.authService.setUserId(res.user_id);
          this.authService.setUser(res.user);

          // Redirect to tasks
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      });
  }

  closeModal() {
    this.loginError = false;
  }
}

