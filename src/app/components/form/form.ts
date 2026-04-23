import { Component, Output, EventEmitter, Input, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Task, Priorty, Category } from '../../models/taskModel';
import { AppNotification } from '../../models/notificationModel';
import { TaskService } from '../../services/taskService';

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

  currentEditedTask: Task | null = null;
  @Input() editedTask: Task | null = null;
  @Output() notify = new EventEmitter<AppNotification>();
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
      this.notify.emit({ msg: 'Title, Description, and Date are required', type: 'warning' });
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
      this.notify.emit({ msg: 'Task updated', type: 'success' });
      this.onTaskEdited.emit(this.currentEditedTask);
    } else {
      const newTask: Task = {
        id: uuidv4(),
        title: this.title,
        desc: this.desc,
        priority: this.priority,
        date: this.date,
        category: this.category,
        tags: this.tags,
        isDone: false,
      };

      this.taskService.addTask(newTask);
      this.notify.emit({ msg: 'Task added', type: 'success' });
    }

    this.title = '';
    this.desc = '';
    this.priority = 'low';
    this.date = '';
    this.category = 'work';
    this.tags = '';
  }
}
