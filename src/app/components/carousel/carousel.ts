import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  images: string[] = ['P1.jpg', 'P2.jpg', 'P3.jpg'];
  currentImgIndex: number = 0;
  timeId: number | undefined;

  constructor() {
    this.auto();
  }

  next() {
    this.currentImgIndex = (this.currentImgIndex + 1) % this.images.length;
  }

  prev() {
    this.currentImgIndex = (this.currentImgIndex - 1 + this.images.length) % this.images.length;
  }

  auto() {
    if (this.timeId) {
      return;
    }

    this.timeId = setInterval(() => {
      this.next();
    }, 3000);
  }
}
