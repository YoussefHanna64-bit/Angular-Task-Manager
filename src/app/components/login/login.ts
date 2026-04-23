import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/userModel';
import { NotificationService } from '../../services/notificationService';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  notificationService = inject(NotificationService);

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: User) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/myTasks']);
    } else {
      this.notificationService.showNotification('Invalid email or password', 'danger');
    }
  }
}
