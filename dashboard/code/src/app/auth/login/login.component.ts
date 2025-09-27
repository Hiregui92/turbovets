import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
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
/*
  onLogin() {
    console.log('Login with:', this.email, this.password);
  }
 */
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
          //localStorage.setItem('jwt', res.token);
          this.authService.setToken(res.access_token);
          this.authService.setUserId(res.user_id);

          // Redirect to tasks
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      });
    /*this.http.post<{ token: string }>('/api/login', payload).subscribe({
      next: (res) => {
        // Guardar JWT en localStorage
        this.authService.setToken(res.token);
        this.loginError = false;

        // Redirigir a /tasks
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loginError = true; // muestra el modal de error
      },
    });*/
  }

  closeModal() {
    this.loginError = false;
  }
}

