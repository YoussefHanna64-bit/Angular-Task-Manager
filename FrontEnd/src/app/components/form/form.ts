import { Component, Output, EventEmitter, Input, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, Priorty, Category } from '../../models/taskModel';
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
  description: string = '';
  priority: Priorty = 'low';
  date: string = '';
  category: Category = 'work';
  tagsInput: string = '';

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
      this.description = task.description;
      this.priority = task.priority;
      this.category = task.category;
      this.tagsInput = task.tags ? task.tags.join(', ') : '';

      if (task.date) {
        this.date = task.date.split('T')[0];
      } else {
        this.date = '';
      }
    }
  }

  submit() {
    if (!this.title || !this.date) {
      this.notificationService.showNotification('Title and Date are required', 'warning');
      return;
    }

    const currentUser = this.userService.user();
    if (!currentUser) {
      return;
    }

    const tags = this.tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (this.currentEditedTask) {
      this.currentEditedTask.title = this.title;
      this.currentEditedTask.description = this.description;
      this.currentEditedTask.priority = this.priority;
      this.currentEditedTask.date = this.date;
      this.currentEditedTask.category = this.category;
      this.currentEditedTask.tags = tags;

      this.taskService.updateTask(this.currentEditedTask);
      this.onTaskEdited.emit(this.currentEditedTask);
    } else {
      const newTask: Task = {
        title: this.title,
        description: this.description,
        priority: this.priority,
        date: this.date,
        category: this.category,
        tags: tags,
        isDone: false,
      };

      this.taskService.addTask(newTask);
    }

    this.title = '';
    this.description = '';
    this.priority = 'low';
    this.date = '';
    this.category = 'work';
    this.tagsInput = '';
  }
}
