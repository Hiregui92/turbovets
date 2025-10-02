import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks-kanban',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-kanban.component.html'
})
export class TasksKanbanComponent implements OnChanges {
  @Input() tasks: Task[] = [];

  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  loading = false;

  constructor(
    private api: TaskService,
    public auth: AuthService
  ) {}

  private updateColumns() {
    // const validTasks = (this.tasks || []).filter(t => t && t.status && t.title);
    this.todoTasks.length = 0;
    this.todoTasks.push(...this.tasks.filter(t => t.status === 'todo'));

    this.inProgressTasks.length = 0;
    this.inProgressTasks.push(...this.tasks.filter(t => t.status === 'in-progress'));

    this.doneTasks.length = 0;
    this.doneTasks.push(...this.tasks.filter(t => t.status === 'done'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.tasks = (this.tasks || []).filter(t => t && t.status && t.title);
      this.updateColumns();
    }
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: 'todo' | 'in-progress' | 'done') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const oldStatus = task.status;
      task.status = newStatus;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const taskPayload: Partial<Task> = {
        status: newStatus
      };
      this.api.updateTask(task.id, { status: newStatus }).subscribe({
        next: () => {
          console.log(`Task ${task.id} updated successfully`);
        },
        error: () => {
          // Revertir cambio en caso de error
          task.status = oldStatus;
          setTimeout(() => this.updateColumns(), 0);
          alert('Failed to update task');
        }
      });
    }
  }
}
