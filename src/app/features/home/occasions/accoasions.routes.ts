import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/occasions/occasions.component').then((p) => p.OccasionsComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/occasion-details/occasion-details.component').then(
        (p) => p.OccasionDetailsComponent,
      ),
  },
];
