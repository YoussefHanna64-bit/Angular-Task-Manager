import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, Priorty, Category } from '../../models/taskModel';

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

  currentEditedTask: Task | null = null;

  @Output() taskAdded = new EventEmitter<Task>();

  @Input() set editedTask(task: Task | null) {
    if (task) {
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
    if (this.currentEditedTask) {
      this.currentEditedTask.title = this.title;
      this.currentEditedTask.desc = this.desc;
      this.currentEditedTask.priority = this.priority;
      this.currentEditedTask.date = this.date;
      this.currentEditedTask.category = this.category;
      this.currentEditedTask.tags = this.tags;
      this.currentEditedTask = null;
    } else {
      const newTask: Task = {
        title: this.title,
        desc: this.desc,
        priority: this.priority,
        date: this.date,
        category: this.category,
        tags: this.tags,
        isDone: false,
      };

      this.taskAdded.emit(newTask);
    }

    this.title = '';
    this.desc = '';
    this.priority = 'low';
    this.date = '';
    this.category = 'work';
    this.tags = '';
  }
}
