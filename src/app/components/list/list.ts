import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card/card';
import { Task } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  imports: [Card],
})
export class List {
  @Input() tasksList: Task[] = [];

  @Output() editTask = new EventEmitter<Task>();
  @Output() notify = new EventEmitter<AppNotification>();

  currentTab: 'all' | 'not-done' | 'done' = 'all';

  get filteredTasks(): Task[] {
    if (this.currentTab === 'done') {
      return this.tasksList.filter((t) => t.isDone);
    }
    if (this.currentTab === 'not-done') {
      return this.tasksList.filter((t) => !t.isDone);
    }
    return this.tasksList;
  }

  setTab(tab: 'all' | 'not-done' | 'done') {
    this.currentTab = tab;
  }

  Edit(task: Task) {
    this.editTask.emit(task);
  }

  Delete(task: Task) {
    const index = this.tasksList.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      this.tasksList.splice(index, 1);
      this.notify.emit({ msg: 'Task deleted', type: 'danger' });
    }
  }
}
