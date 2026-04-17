import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/taskModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() task!: Task;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  done() {
    this.task.isDone = !this.task.isDone;
  }
}
