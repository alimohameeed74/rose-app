import { Route } from '@angular/router';
import { authGuard } from '../../core/guards/auth/auth.guard.js';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/pages/home/home.component').then((p) => p.HomeComponent),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then((r) => r.routes),
  },
  {
    path: 'occasions',
    loadChildren: () => import('./occasions/accoasions.routes').then((r) => r.routes),
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.routes').then((r) => r.routes),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./account/pages/account-settings/account-settings.component').then(
        (p) => p.AccountSettingsComponent,
      ),
    loadChildren: () => import('./account/account.routes').then((r) => r.routes),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/pages/contact/contact.component').then((p) => p.ContactComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/pages/about/about.component').then((p) => p.AboutComponent),
  },
];
