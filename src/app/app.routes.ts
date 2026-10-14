import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth/auth-layout/auth-layout.component').then((l) => l.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home/pages/home/home.component').then((p) => p.HomeComponent),
  },
  //   {
  //     path: 'admin',
  //   },
  //   {
  //     path: '**',
  //   },
];
