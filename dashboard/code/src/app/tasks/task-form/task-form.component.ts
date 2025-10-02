import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  title = '';
  loading = false;
  taskId: number | null = null;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['To Do', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private api: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    // Detectamos si hay un ID en la ruta → modo edición
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number) {
    this.loading = true;
    this.api.getTaskById(id).subscribe({
      next: (task: any) => {
        this.taskForm.patchValue(task);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading task', err);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.loading = true;
      const currentUser = this.auth.getUser();

      // ⚡ Normalizamos los valores del formulario
      const taskPayload: Partial<Task> = {
        title: this.taskForm.value.title ?? '', // nunca null
        description: this.taskForm.value.description ?? '',
        // status: this.taskForm.value.status as 'To Do' | 'In Progress' | 'Done',
        status: this.taskForm.value.status as 'todo' | 'in-progress' | 'done',
        owner: currentUser?.id 
      };

      if (this.taskId) {
        // Actualizar tarea
        this.api.updateTask(this.taskId, taskPayload).subscribe({
          next: res => {
            alert('Task updated successfully!');
            this.loading = false;
          },
          error: err => {
            console.error(err);
            alert('Failed to update task');
            this.loading = false;
          }
        });
      } else {
        // Crear tarea
        this.api.createTask(taskPayload).subscribe({
          next: res => {
            alert('Task created successfully!');
            this.taskForm.reset({ status: 'To Do' });
            this.loading = false;
          },
          error: err => {
            console.error(err);
            alert('Failed to create task');
            this.loading = false;
          }
        });
      }
    }
  }

}
