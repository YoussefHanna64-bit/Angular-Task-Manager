import { Component, Input } from '@angular/core';
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
    console.log('Editing task:', task.title);
  }

  Delete(task: Task) {
    console.log('Deleting task:', task.title);
  }
}
