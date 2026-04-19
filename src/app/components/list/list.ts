import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Task } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';
import { Tab } from '../tab/tab';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  imports: [Tab],
})
export class List {
  tasksList: Task[] = [];
  @Input() task: Task | null = null;

  @Output() editTask = new EventEmitter<Task>();
  @Output() notify = new EventEmitter<AppNotification>();

  currentTab: 'all' | 'notDone' | 'done' = 'all';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].currentValue) {
      this.tasksList.push(changes['task'].currentValue);
    }
  }

  get filteredTasks(): Task[] {
    if (this.currentTab === 'done') {
      return this.tasksList.filter((t) => t.isDone);
    }
    if (this.currentTab === 'notDone') {
      return this.tasksList.filter((t) => !t.isDone);
    }
    return this.tasksList;
  }

  setTab(tab: 'all' | 'notDone' | 'done') {
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
