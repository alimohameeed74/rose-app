import { CategoriesService } from './../../services/categories.service';
import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { Category } from '../../models/category.js';
import { CategoryCardLoaderComponent } from '../../../../../shared/skeletons/category/category-card-loader/category-card-loader.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CategoryCardComponent, CategoryCardLoaderComponent],
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  isLoading: WritableSignal<boolean> = signal(false);
  categories: WritableSignal<Category[]> = signal([]);
  constructor() {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading.set(true);
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Category[]) => {
          this.isLoading.set(false);
          this.categories.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.categories.set([]);
        },
      });
  }
}
