import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  @Input() type: string = 'info';
  @Input() msg: string = '';
}
