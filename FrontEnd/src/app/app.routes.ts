import { Routes } from '@angular/router';
import { MainLayout } from './layouts/mainLayout/mainLayout';
import { AuthLayout } from './layouts/authLayout/authLayout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'addTask',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/addTask/addTask').then((m) => m.AddTask),
      },
      {
        path: 'myTasks',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/myTasks/myTasks').then((m) => m.MyTasks),
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./pages/unauthorized/unauthorized').then((m) => m.Unauthorized),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup').then((m) => m.SignUp),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
