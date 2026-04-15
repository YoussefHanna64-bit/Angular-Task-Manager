import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  desc: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  category: 'work' | 'personal' | 'study';
  tags: string;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
  imports: [FormsModule],
})
export class Input {
  title: string = '';
  desc: string = '';
  priority: 'low' | 'medium' | 'high' = 'low';
  date: string = '';
  category: 'work' | 'personal' | 'study' = 'work';
  tags: string = '';

  tasksList: Task[] = [];

  submit() {
    const newTask: Task = {
      title: this.title,
      desc: this.desc,
      priority: this.priority,
      date: this.date,
      category: this.category,
      tags: this.tags,
    };

    this.tasksList.push(newTask);
    console.log(this.tasksList);

    this.title = '';
    this.desc = '';
    this.priority = 'low';
    this.date = '';
    this.category = 'work';
    this.tags = '';
  }
}
