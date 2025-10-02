import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface MenuItem {
  label: string;
  route: string;
  permission: string | null;
}

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
          <ng-container *ngFor="let item of visibleMenu">
            <a *ngIf="authService.hasPermission(item.permission!)" 
               [routerLink]="item.route" 
               class="hover:underline">
              {{ item.label }}
            </a>
          </ng-container>
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

  menuItems: MenuItem[] = [
    { label: 'Tasks', route: '/tasks', permission: 'task.read' },
    { label: 'Audits', route: '/audit-log', permission: 'audit.read' },
    { label: 'Organizations', route: '/organizations', permission: 'organization.read' },
    { label: 'Roles', route: '/roles', permission: 'role.read' },
    { label: 'Permissions', route: '/permissions', permission: 'permission.read' },
  ];

  get visibleMenu() {
    return this.menuItems.filter(item => !item.permission || this.authService.hasPermission(item.permission));
  }

  constructor(public authService: AuthService, private router: Router) {}

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
    this.router.navigate(['/login']);
  }
}
