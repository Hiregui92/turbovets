import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from './task-list.component';
import { TasksKanbanComponent } from './task-kanban.component';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TasksListComponent, TasksKanbanComponent, FormsModule],
  templateUrl: './task-page.component.html'
})
export class TasksPageComponent implements OnInit {
  viewMode: 'list' | 'kanban' = 'list';
  tasks: Task[] = [];
  // Filters
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedStatus: string = 'all';

  constructor(
    private router: Router, 
    private taskService: TaskService, 
    public auth: AuthService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  get filteredTasks() {
    let data = [...this.tasks]; // <-- usar this.tasks

    // Filter by search
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(task =>
        (task.title && task.title.toLowerCase().includes(term)) ||
        (task.description && task.description.toLowerCase().includes(term)) ||
        (task.status && task.status.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (this.selectedStatus !== 'all') {
      data = data.filter(task => task.status === this.selectedStatus);
    }

    // Sort
    data.sort((a, b) => {
      const comp = a.title.localeCompare(b.title);
      return this.sortDirection === 'asc' ? comp : -comp;
    });

    return data;
  }

  setViewMode(mode: 'list' | 'kanban') {
    this.viewMode = mode;
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  goToNewTask() {
    if (!this.auth.hasPermission('task.create')) {
      return;
    }
    this.router.navigate(['/tasks/new']);
  }

}

