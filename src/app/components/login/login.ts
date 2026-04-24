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
    this.userService.login(email).subscribe({
      next: (users) => {
        if (users.length > 0 && users[0].password === password) {
          this.userService.setCurrentUser(users[0]);
          this.router.navigate(['/myTasks']);
          this.notificationService.showNotification('Welcome back, ' + users[0].name, 'success');
        } else {
          this.notificationService.showNotification('Invalid email or password', 'danger');
        }
      },
      error: () => {
        this.notificationService.showNotification('Error happened. Please try again', 'danger');
      },
    });
  }
}
