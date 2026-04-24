import { Component, Output, EventEmitter, Input, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Task, Priorty, Category } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';
import { TaskService } from '../../services/taskService';
import { NotificationService } from '../../services/notificationService';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrl: './form.css',
  imports: [FormsModule],
})
export class Form {
  title: string = '';
  desc: string = '';
  priority: Priorty = 'low';
  date: string = '';
  category: Category = 'work';
  tags: string = '';

  taskService = inject(TaskService);
  notificationService = inject(NotificationService);
  userService = inject(UserService);

  currentEditedTask: Task | null = null;
  @Input() editedTask: Task | null = null;
  @Output() onTaskEdited = new EventEmitter<Task>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editedTask'] && changes['editedTask'].currentValue) {
      const task = changes['editedTask'].currentValue;
      this.currentEditedTask = task;

      this.title = task.title;
      this.desc = task.desc;
      this.priority = task.priority;
      this.date = task.date;
      this.category = task.category;
      this.tags = task.tags;
    }
  }

  submit() {
    if (!this.title || !this.desc || !this.date) {
      this.notificationService.showNotification(
        'Title, Description, and Date are required',
        'warning',
      );
      return;
    }

    const currentUser = this.userService.user();
    if (!currentUser) {
      return;
    }

    if (this.currentEditedTask) {
      this.currentEditedTask.title = this.title;
      this.currentEditedTask.desc = this.desc;
      this.currentEditedTask.priority = this.priority;
      this.currentEditedTask.date = this.date;
      this.currentEditedTask.category = this.category;
      this.currentEditedTask.tags = this.tags;

      this.taskService.updateTask(this.currentEditedTask);
      this.onTaskEdited.emit(this.currentEditedTask);
    } else {
      const newTask: Task = {
        id: uuidv4(),
        userId: currentUser.id,
        title: this.title,
        desc: this.desc,
        priority: this.priority,
        date: this.date,
        category: this.category,
        tags: this.tags,
        isDone: false,
      };

      this.taskService.addTask(newTask);
    }

    this.title = '';
    this.desc = '';
    this.priority = 'low';
    this.date = '';
    this.category = 'work';
    this.tags = '';
  }
}
