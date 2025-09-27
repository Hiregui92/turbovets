import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TasksPageComponent } from './tasks/task-list/task-page.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { AuthGuard } from './auth.guard';

import { OrganizationListComponent } from './organizations/organization-list.component';
import { OrganizationFormComponent } from './organizations/organization-form.component';
import { RoleListComponent } from './roles/role-list.component';
import { RoleFormComponent } from './roles/role-form.component';
import { PermissionListComponent } from './permissions/permission-list.component';
import { PermissionFormComponent } from './permissions/permission-form.component';
import { AuditListComponent } from './audits/audit-list.component';

/*
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasks/list', component: TasksListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
*/
export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'tasks', component: TasksPageComponent, canActivate: [AuthGuard], },
      { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard], },

      // Organizations
      { path: 'organizations', component: OrganizationListComponent },
      { path: 'organizations/new', component: OrganizationFormComponent },
      { path: 'organizations/:id/edit', component: OrganizationFormComponent },

      // Roles
      { path: 'roles', component: RoleListComponent },
      { path: 'roles/new', component: RoleFormComponent },
      { path: 'roles/:id/edit', component: RoleFormComponent },

      // Permissions
      { path: 'permissions', component: PermissionListComponent },
      { path: 'permissions/new', component: PermissionFormComponent },
      { path: 'permissions/:id/edit', component: PermissionFormComponent },


      //{ path: 'tasks', component: TasksPageComponent },

      //{ path: 'tasks/kanban', component: TaskKanbanComponent },
      { path: 'audit-log', component: AuditListComponent, canActivate: [AuthGuard], },
    ],
  },
  { path: '**', redirectTo: 'login' }
];
