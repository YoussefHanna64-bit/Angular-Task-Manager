import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Input } from './components/input/Input';
import { Footer } from './components/footer/footer';
import { List } from './components/list/list';

@Component({
  selector: 'app-root',
  imports: [Header, Input, List, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TaskManager');
}
