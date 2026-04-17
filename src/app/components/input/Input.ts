import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, Priorty, Category } from '../../models/taskModel';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
  imports: [FormsModule],
})
export class Input {
  title: string = '';
  desc: string = '';
  priority: Priorty = 'low';
  date: string = '';
  category: Category = 'work';
  tags: string = '';

  @Output() taskAdded = new EventEmitter<Task>();

  submit() {
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

    this.title = '';
    this.desc = '';
    this.priority = 'low';
    this.date = '';
    this.category = 'work';
    this.tags = '';
  }
}
