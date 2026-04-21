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
        loadComponent: () => import('./components/carousel/carousel').then((m) => m.Carousel),
      },
      {
        path: 'addTask',
        canActivate: [authGuard],
        loadComponent: () => import('./components/form/form').then((m) => m.Form),
      },
      {
        path: 'myTasks',
        canActivate: [authGuard],
        loadComponent: () => import('./components/list/list').then((m) => m.List),
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./components/unauthorized/unauthorized').then((m) => m.Unauthorized),
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
        loadComponent: () => import('./components/login/login').then((m) => m.Login),
      },
      {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup').then((m) => m.SignUp),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
