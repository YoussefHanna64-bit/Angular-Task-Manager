import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskResponse } from '../models/taskModel';
import { NotificationService } from './notificationService';
import { UserService } from './userService';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:5000/api/tasks';
  http = inject(HttpClient);
  notificationService = inject(NotificationService);
  userService = inject(UserService);

  tasks = signal<Task[]>([]);

  getAllTasks() {
    this.http.get<TaskResponse>(`${this.baseUrl}`).subscribe({
      next: (res) => {
        this.tasks.set(res.tasks || []);
      },
      error: () => {
        this.notificationService.showNotification('Failed to load tasks', 'danger');
      },
    });
  }

  addTask(newTask: Task) {
    this.http.post<TaskResponse>(this.baseUrl, newTask).subscribe({
      next: (res) => {
        if (res.task) {
          this.tasks.update((tasks) => [...tasks, res.task!]);
          this.notificationService.showNotification('Task added', 'success');
        }
      },
      error: () => {
        this.notificationService.showNotification('Failed to add task', 'danger');
      },
    });
  }

  updateTask(updatedTask: Task) {
    this.http.put<TaskResponse>(`${this.baseUrl}/${updatedTask._id}`, updatedTask).subscribe({
      next: (res) => {
        if (res.task) {
          this.tasks.update((tasks) => tasks.map((t) => (t._id === res.task!._id ? res.task! : t)));
          this.notificationService.showNotification('Task updated', 'success');
        }
      },
      error: () => {
        this.notificationService.showNotification('Failed to update task', 'danger');
      },
    });
  }

  deleteTask(taskId: string) {
    this.http.delete(`${this.baseUrl}/${taskId}`).subscribe({
      next: (res) => {
        this.tasks.update((tasks) => tasks.filter((t) => t._id !== taskId));
        this.notificationService.showNotification('Task deleted', 'danger');
      },
      error: () => {
        this.notificationService.showNotification('Failed to delete task', 'danger');
      },
    });
  }
}
