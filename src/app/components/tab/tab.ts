import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card/card';
import { Task } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';

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
  @Output() notify = new EventEmitter<AppNotification>();

  ngOnDestroy() {
    this.notify.emit({ msg: `${this.tabName} tab is closed.`, type: 'info' });
  }
}
