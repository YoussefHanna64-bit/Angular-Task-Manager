import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLinkActive, RouterLink],
})
export class Header {
  router = inject(Router);
  userService = inject(UserService);

  get currentUser() {
    return this.userService.user();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }
}
