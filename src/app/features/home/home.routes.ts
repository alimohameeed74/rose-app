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
    loadComponent: () =>
      import('./products/pages/products/products.component').then((p) => p.ProductsComponent),
  },
  {
    path: 'occasions',
    loadComponent: () =>
      import('./occasions/pages/occasions/occasions.component').then((p) => p.OccasionsComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/pages/categories/categories.component').then(
        (p) => p.CategoriesComponent,
      ),
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
