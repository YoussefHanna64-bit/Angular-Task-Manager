import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/userModel';
import { NotificationService } from '../../services/notificationService';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  notificationService = inject(NotificationService);
  userService = inject(UserService);

  login(email: string, password: string) {
    this.userService.login(email, password).subscribe({
      next: (res) => {
        if (res.success && res.user) {
          this.userService.setCurrentUser(res.user, res.token);
          this.router.navigate(['/myTasks']);
          this.notificationService.showNotification(
            'Welcome back, ' + res.user.userName,
            'success',
          );
        }
      },
      error: (e) => {
        this.notificationService.showNotification(
          e.error?.message || 'Error happened. Please try again',
          'danger',
        );
      },
    });
  }
}
