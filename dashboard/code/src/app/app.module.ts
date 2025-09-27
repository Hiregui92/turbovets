import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
/*import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
*/
@NgModule({
  declarations: [
    AppComponent,
    /*LoginComponent,
    SignupComponent,
    TaskListComponent,
    TaskFormComponent*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //RouterModule.forRoot(routes)
  ],
  providers: [provideHttpClient(withInterceptors([AuthInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
