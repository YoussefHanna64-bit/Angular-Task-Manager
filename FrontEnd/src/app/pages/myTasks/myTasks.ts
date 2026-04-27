import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Task } from '../../models/taskModel';
import { Tab } from '../../components/tab/tab';
import { TaskService } from '../../services/taskService';
import { Form } from '../../components/form/form';
import { NotificationService } from '../../services/notificationService';

@Component({
  selector: 'app-myTasks',
  templateUrl: './myTasks.html',
  styleUrl: './myTasks.css',
  imports: [Tab, Form],
})
export class MyTasks {
  taskService = inject(TaskService);
  notificationService = inject(NotificationService);

  taskToEdit: Task | null = null;

  @Output() editTask = new EventEmitter<Task>();

  @ViewChild('openModalBtn') openModalBtn!: ElementRef;

  currentTab: 'all' | 'notDone' | 'done' = 'all';

  ngOnInit() {
    this.taskService.getAllTasks();
  }

  get filteredTasks(): Task[] {
    const tasksList = this.taskService.tasks();
    if (this.currentTab === 'done') {
      return tasksList.filter((t) => t.isDone);
    }
    if (this.currentTab === 'notDone') {
      return tasksList.filter((t) => !t.isDone);
    }
    return tasksList;
  }

  setTab(tab: 'all' | 'notDone' | 'done') {
    this.currentTab = tab;
  }

  Edit(task: Task) {
    this.taskToEdit = task;
    this.openModalBtn.nativeElement.click();
  }

  Delete(task: Task) {
    this.taskService.deleteTask(task._id!);
  }
}
