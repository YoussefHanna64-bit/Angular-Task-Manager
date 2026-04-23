import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Task } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';
import { NotificationService } from '../../services/notificationService';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  notificationService = inject(NotificationService);

  @Input() task: Task | null = null;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  done() {
    if (!this.task) {
      return;
    }

    this.task.isDone = !this.task.isDone;

    if (this.task.isDone) {
      this.notificationService.showNotification('Task is done', 'success');
    } else {
      this.notificationService.showNotification('Task is not done.', 'info');
    }
  }
}
