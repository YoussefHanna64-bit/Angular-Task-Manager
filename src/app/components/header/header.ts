import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  count: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}
