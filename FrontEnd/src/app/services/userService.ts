import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserResponse } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/auth';
  http = inject(HttpClient);

  user = signal<User | null>(null);

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user.set(JSON.parse(currentUser));
    }
  }

  login(email: string, password: string) {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, { email, password });
  }

  signup(userName: string, email: string, password: string) {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, { userName, email, password });
  }

  setCurrentUser(user: User, token: string) {
    this.user.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
