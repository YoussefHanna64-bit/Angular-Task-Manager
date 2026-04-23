import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/taskModel';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  tasks = signal<Task[]>([]);

  getAllTasks() {
    this.http.get<Task[]>(`${this.baseUrl}/tasks`).subscribe((data) => {
      this.tasks.set(data);
    });
  }

  addTask(newTask: Task) {
    this.http.post<Task>(`${this.baseUrl}/tasks`, newTask).subscribe((data) => {
      this.tasks.update((tasks) => [...tasks, data]);
    });
  }

  updateTask(updatedTask: Task) {
    this.http
      .put<Task>(`${this.baseUrl}/tasks/${updatedTask.id}`, updatedTask)
      .subscribe((data) => {
        this.tasks.update((tasks) => tasks.map((t) => (t.id === data.id ? data : t)));
      });
  }

  deleteTask(taskId: string) {
    this.http.delete(`${this.baseUrl}/tasks/${taskId}`).subscribe(() => {
      this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
    });
  }
}
