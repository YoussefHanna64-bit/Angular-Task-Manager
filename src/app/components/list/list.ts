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
}
