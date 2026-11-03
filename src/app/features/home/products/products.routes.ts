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
      import('./pages/products/products.component').then((p) => p.ProductsComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details.component').then(
        (p) => p.ProductDetailsComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () => import('../cart/pages/cart/cart.component').then((p) => p.CartComponent),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('../wishlist/pages/wishlist/wishlist.component').then((p) => p.WishlistComponent),
  },
];
