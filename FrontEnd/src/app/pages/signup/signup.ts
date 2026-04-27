import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/userModel';
import { NotificationService } from '../../services/notificationService';
import { UserService } from '../../services/userService';

function matchPassword(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }
  return password.value === confirmPassword.value ? null : { missMatch: true };
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignUp {
  router = inject(Router);
  notificationService = inject(NotificationService);
  userService = inject(UserService);

  signupForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: matchPassword },
  );

  signup() {
    const { name, email, password } = this.signupForm.value;

    this.userService.signup(name, email, password).subscribe({
      next: (res) => {
        if (res.success) {
          this.userService.setCurrentUser(res.user!, res.token);
          this.router.navigate(['/myTasks']);
          this.notificationService.showNotification('Welcome, ' + res.user!.userName, 'success');
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
