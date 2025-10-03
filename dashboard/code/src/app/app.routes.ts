import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TasksPageComponent } from './tasks/task-list/task-page.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { AuthGuard } from './auth.guard';
import { RedirectGuard } from './redirect.guard';
import { RedirectComponent } from './redirect.component';

import { OrganizationListComponent } from './organizations/organization-list.component';
import { OrganizationFormComponent } from './organizations/organization-form.component';
import { RoleListComponent } from './roles/role-list.component';
import { RoleFormComponent } from './roles/role-form.component';
import { PermissionListComponent } from './permissions/permission-list.component';
import { PermissionFormComponent } from './permissions/permission-form.component';
import { AuditListComponent } from './audits/audit-list.component';


export const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
    canActivate: [RedirectGuard],
  },
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
      { path: 'tasks', component: TasksPageComponent, canActivate: [AuthGuard]},
      { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard], },
      { path: 'tasks/:id/edit', component: TaskFormComponent, canActivate: [AuthGuard], },

      // Organizations
      { path: 'organizations', component: OrganizationListComponent, canActivate: [AuthGuard]},
      { path: 'organizations/new', component: OrganizationFormComponent, canActivate: [AuthGuard]},
      { path: 'organizations/:id/edit', component: OrganizationFormComponent, canActivate: [AuthGuard]},

      // Roles
      { path: 'roles', component: RoleListComponent, canActivate: [AuthGuard]},
      { path: 'roles/new', component: RoleFormComponent, canActivate: [AuthGuard]},
      { path: 'roles/:id/edit', component: RoleFormComponent, canActivate: [AuthGuard]},

      // Permissions
      { path: 'permissions', component: PermissionListComponent, canActivate: [AuthGuard]},
      { path: 'permissions/new', component: PermissionFormComponent, canActivate: [AuthGuard]},
      { path: 'permissions/:id/edit', component: PermissionFormComponent, canActivate: [AuthGuard]},

      { path: 'audit-log', component: AuditListComponent, canActivate: [AuthGuard], },
    ],
  },
  { path: '**', redirectTo: 'login' }
];
