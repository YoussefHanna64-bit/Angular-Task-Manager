import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLinkActive, RouterLink],
})
export class Header {
  router = inject(Router);

  get currentUser() {
    return localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
}
