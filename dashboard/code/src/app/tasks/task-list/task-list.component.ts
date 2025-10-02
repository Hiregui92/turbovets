import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];
  loading = false;

  constructor(
    private router: Router, 
    public auth: AuthService, 
    private api: TaskService) {}

  deleteTask(id: number) {
    this.loading = true;
    this.api.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error deleting task', err);
        this.loading = false;
      }
    });
  }

  viewTask(id: number) {
    console.log("desde aqui");
    this.router.navigate(['/tasks', id, 'edit']);
  }

}

