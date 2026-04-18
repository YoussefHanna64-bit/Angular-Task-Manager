import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card/card';
import { Task } from '../../models/taskModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  imports: [Card],
})
export class List {
  @Input() tasksList: Task[] = [];

  @Output() editTask = new EventEmitter<Task>();

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
    this.tasksList = this.tasksList.filter((t) => t.title !== task.title);
  }
}
