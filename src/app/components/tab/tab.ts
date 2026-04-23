import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Card } from '../card/card';
import { Task } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';
import { NotificationService } from '../../services/notificationService';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.html',
  styleUrl: './tab.css',
  imports: [Card],
})
export class Tab {
  @Input() tasks: Task[] = [];
  @Input() tabName: string = '';

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  notificationService = inject(NotificationService);

  ngOnDestroy() {
    this.notificationService.showNotification(`${this.tabName} tab is closed.`, 'info');
  }
}
