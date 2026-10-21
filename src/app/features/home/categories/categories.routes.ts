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
      import('./pages/categories/categories.component').then((p) => p.CategoriesComponent),
  },
  {
    path: 'categories/:id',
    loadComponent: () =>
      import('./pages/category-details/category-details.component').then(
        (p) => p.CategoryDetailsComponent,
      ),
  },
  {
    path: 'subcategories/:id',
    loadComponent: () =>
      import('./pages/subcategory-details/subcategory-details.component').then(
        (p) => p.SubcategoryDetailsComponent,
      ),
  },
];
