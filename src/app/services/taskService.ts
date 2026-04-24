import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/taskModel';
import { NotificationService } from './notificationService';
import { UserService } from './userService';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:3000/tasks';
  http = inject(HttpClient);
  notificationService = inject(NotificationService);
  userService = inject(UserService);

  tasks = signal<Task[]>([]);

  getAllTasks() {
    const currentUser = this.userService.user();
    if (!currentUser) {
      return;
    }
    this.http.get<Task[]>(`${this.baseUrl}?userId=${currentUser.id}`).subscribe({
      next: (data) => {
        this.tasks.set(data);
      },
      error: () => {
        this.notificationService.showNotification('Failed to load tasks', 'danger');
      },
    });
  }

  addTask(newTask: Task) {
    this.http.post<Task>(this.baseUrl, newTask).subscribe({
      next: (data) => {
        this.tasks.update((tasks) => [...tasks, data]);
        this.notificationService.showNotification('Task added', 'success');
      },
      error: () => {
        this.notificationService.showNotification('Failed to add task', 'danger');
      },
    });
  }

  updateTask(updatedTask: Task) {
    this.http.put<Task>(`${this.baseUrl}/${updatedTask.id}`, updatedTask).subscribe({
      next: (data) => {
        this.tasks.update((tasks) => tasks.map((t) => (t.id === data.id ? data : t)));
        this.notificationService.showNotification('Task updated', 'success');
      },
      error: () => {
        this.notificationService.showNotification('Failed to update task', 'danger');
      },
    });
  }

  deleteTask(taskId: string) {
    this.http.delete(`${this.baseUrl}/${taskId}`).subscribe({
      next: () => {
        this.tasks.update((tasks) => tasks.filter((t) => t.id !== taskId));
        this.notificationService.showNotification('Task deleted', 'success');
      },
      error: () => {
        this.notificationService.showNotification('Failed to delete task', 'danger');
      },
    });
  }
}
