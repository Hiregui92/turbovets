import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
/*
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}
*/
@Component({
  selector: 'app-tasks-kanban',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-kanban.component.html'
})
export class TasksKanbanComponent {
  @Input() tasks: Task[] = [];

  get todo() { return this.tasks.filter(t => t.status === 'To Do'); }
  get inProgress() { return this.tasks.filter(t => t.status === 'In Progress'); }
  get done() { return this.tasks.filter(t => t.status === 'Done'); }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus; // actualizar estado al mover
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
