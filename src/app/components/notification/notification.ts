import { Component, inject, Input } from '@angular/core';
import { NotificationService } from '../../services/notificationService';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  notificationService = inject(NotificationService);
  currentNotification = this.notificationService.notify;
}
