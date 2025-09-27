export class CreateTaskDto {
  title: string = 'New';
  description?: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
}

