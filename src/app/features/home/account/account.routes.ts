import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((p) => p.ProfileComponent),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/change-password/change-password.component').then(
        (p) => p.ChangePasswordComponent,
      ),
  },
  {
    path: 'addresses',
    loadComponent: () =>
      import('./pages/addresses/addresses.component').then((p) => p.AddressesComponent),
  },
];
