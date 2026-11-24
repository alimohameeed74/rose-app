import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest/guest.guard.js';
import { authGuard } from './core/guards/auth/auth.guard.js';
import { userGuard } from './core/guards/user/user.guard.js';
import { adminGuard } from './core/guards/admin/admin.guard.js';

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
      import('./layouts/home/home-layout/home-layout.component').then((l) => l.HomeLayoutComponent),
    loadChildren: () => import('./features/home/home.routes').then((r) => r.routes),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./layouts/admin/admin-layout/admin-layout.component').then(
        (l) => l.AdminLayoutComponent,
      ),
    loadChildren: () => import('./features/admin/admin.routes.js').then((r) => r.routes),
  },
  //   {
  //     path: '**',
  //   },
];
