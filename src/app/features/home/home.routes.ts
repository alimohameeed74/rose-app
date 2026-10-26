import { Route } from '@angular/router';

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
