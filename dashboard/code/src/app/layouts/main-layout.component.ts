import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      <!-- Top Navbar -->
      <header class="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        <h1 class="text-xl font-bold">My App</h1>

        <!-- Navigation -->
        <nav class="space-x-4">
          <a routerLink="/tasks" class="hover:underline">Tasks</a>
          <a routerLink="/audit-log" class="hover:underline">Audits</a>
          <a routerLink="/organizations" class="hover:underline">Organizations</a>
          <a routerLink="/roles" class="hover:underline">Roles</a>
          <a routerLink="/permissions" class="hover:underline">Permissions</a>
	        <button (click)="onLogout()">Logout</button>
        </nav>

        <!-- Dark/Light Toggle -->
        <button 
          class="ml-4 px-3 py-1 rounded-lg border dark:border-gray-700"
          (click)="toggleDarkMode()">
          {{ isDark ? '🌞' : '🌙' }}
        </button>
      </header>

      <!-- Main content -->
      <main class="flex-1 p-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class MainLayoutComponent {
  isDark = false;
  constructor(private authService: AuthService, private router: Router) {}

  toggleDarkMode() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  onLogout() {
    this.authService.clearToken();
    this.router.navigate(['/login']); // redirect to login page
  }
}

