import { Component } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  imports: [Card],
})
export class List {}
