import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() task!: Task;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() notify = new EventEmitter<AppNotification>();

  done() {
    this.task.isDone = !this.task.isDone;

    if (this.task.isDone) {
      this.notify.emit({ msg: 'Task is done', type: 'success' });
    } else {
      this.notify.emit({ msg: 'Task is not done.', type: 'info' });
    }
  }
}
