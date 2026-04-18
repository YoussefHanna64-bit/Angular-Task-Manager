import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Form } from './components/input/form';
import { Footer } from './components/footer/footer';
import { List } from './components/list/list';
import { Carousel } from './components/carousel/carousel';
import { Task } from './models/taskModel';

@Component({
  selector: 'app-root',
  imports: [Header, Carousel, Form, List, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  Tasks: Task[] = [];

  editedTask: Task | null = null;

  addTaskToList(newTask: Task) {
    this.Tasks.push(newTask);
  }

  setEditedTask(task: Task) {
    this.editedTask = task;
  }
}
