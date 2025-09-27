import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  title = '';
  loading = false;
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['To Do', Validators.required],
  });
  
  constructor(private fb: FormBuilder, private api: ApiService) {}
/*
  onSubmit() {
    this.api.createTask({ title: this.title }).subscribe({
      next: res => console.log('Task created', res),
      error: err => console.error('Task creation failed', err)
    });
  }*/
  onSubmit() {
    if (this.taskForm.valid) {
      this.loading = true;

      this.api.createTask(this.taskForm.value).subscribe({
        next: (res) => {
          console.log('Task created:', res);
          alert('Task created successfully!');
          this.taskForm.reset({ status: 'todo' });
          this.loading = false;
        },
        error: (err) => {
          console.error('Task creation failed', err);
          alert('Failed to create task');
          this.loading = false;
        }
      });
    }
  }
}
