import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/users';
  http = inject(HttpClient);

  user = signal<User | null>(null);

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user.set(JSON.parse(currentUser));
    }
  }

  login(email: string) {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`);
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<User>(this.baseUrl, { name, email, password });
  }

  setCurrentUser(user: User) {
    this.user.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('currentUser');
  }
}
