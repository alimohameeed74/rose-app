import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layouts/auth/auth-layout/auth-layout.component').then((l) => l.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./layouts/home/home-layout/home-layout.component').then((p) => p.HomeLayoutComponent),
    loadChildren: () => import('./features/home/home.routes').then((r) => r.routes),
  },
  //   {
  //     path: 'admin',
  //   },
  //   {
  //     path: '**',
  //   },
];
