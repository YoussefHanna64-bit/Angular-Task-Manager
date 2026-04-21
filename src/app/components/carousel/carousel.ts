import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  images: string[] = ['P1.jpg', 'P2.jpg', 'P3.jpg'];
  currentImgIndex: number = 0;
  timeId: number | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.auto();
  }

  auto() {
    if (this.timeId !== undefined) {
      return;
    }

    this.timeId = setInterval(() => {
      this.next();
      this.cdr.markForCheck();
    }, 3000);
  }

  stop() {
    if (this.timeId !== undefined) {
      clearInterval(this.timeId);
      this.timeId = undefined;
    }
  }

  next() {
    this.stop();
    this.currentImgIndex = (this.currentImgIndex + 1) % this.images.length;
    this.auto();
  }

  prev() {
    this.stop();
    this.currentImgIndex = (this.currentImgIndex - 1 + this.images.length) % this.images.length;
    this.auto();
  }
}
