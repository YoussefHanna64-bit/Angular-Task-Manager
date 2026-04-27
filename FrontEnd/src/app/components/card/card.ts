import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Task } from '../../models/taskModel';
import { NotificationService } from '../../services/notificationService';
import { TaskService } from '../../services/taskService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  imports: [DatePipe],
})
export class Card {
  notificationService = inject(NotificationService);
  taskService = inject(TaskService);

  @Input() task: Task | null = null;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  done() {
    if (!this.task) {
      return;
    }

    this.task.isDone = true;
    this.taskService.updateTask(this.task);
    this.notificationService.showNotification('Task is done', 'success');
  }
}
