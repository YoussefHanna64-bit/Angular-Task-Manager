import { Component } from '@angular/core';
import { Form } from '../../components/form/form';

@Component({
  selector: 'app-addTask',
  templateUrl: './addTask.html',
  styleUrl: './addTask.css',
  imports: [Form],
})
export class AddTask {}
