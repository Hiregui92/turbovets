import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
/*
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}
*/
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})
// export class TasksListComponent implements OnInit {
export class TasksListComponent {
// viewMode: 'list' | 'kanban' = 'list';
  @Input() tasks: Task[] = [];
/*
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  setViewMode(mode: 'list' | 'kanban') {
    this.viewMode = mode;
  }*/

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  viewTask(id: number) {
    // Por ahora solo mostramos en consola
    // Más adelante puedes navegar a `/tasks/:id/edit`
    console.log('Viewing task:', id);
  }

}

