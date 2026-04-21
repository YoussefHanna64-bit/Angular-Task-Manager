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
    const user: User = { name, email, password };

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const isExistingUser = users.find((u: User) => u.email === email);
    if (isExistingUser) {
      alert('Email already exists');
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    this.router.navigate(['/login']);
  }
}
