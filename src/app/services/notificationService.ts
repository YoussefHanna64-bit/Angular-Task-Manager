import { Injectable, signal } from '@angular/core';
import { AppNotification } from '../models/notificationModel';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notify = signal<AppNotification | null>(null);

  showNotification(msg: string, type: string) {
    this.notify.set({ msg, type });
    
    setTimeout(() => {
      this.notify.set(null);
    }, 3000);
  }
}
