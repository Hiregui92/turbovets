import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
import { TasksListComponent } from './task-list.component';
import { TasksKanbanComponent } from './task-kanban.component';


/*
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}
*/
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TasksListComponent, TasksKanbanComponent],
  templateUrl: './task-page.component.html'
})
export class TasksPageComponent implements OnInit {
  viewMode: 'list' | 'kanban' = 'list';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  setViewMode(mode: 'list' | 'kanban') {
    this.viewMode = mode;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  viewTask(id: number) {
    // Por ahora solo mostramos en consola
    // Más adelante puedes navegar a `/tasks/:id/edit`
    console.log('Viewing task:', id);
  }

}

