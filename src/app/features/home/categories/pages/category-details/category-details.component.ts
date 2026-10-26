import { CategoriesService } from './../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit, DestroyRef, WritableSignal, signal } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Card } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { Category } from '../../models/category.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryDetailsLoaderComponent } from '../../../../../shared/skeletons/category/category-details-loader/category-details-loader.component';
import { ButtonDirective } from 'primeng/button';
import { SubcategoryCardComponent } from '../../components/subcategory-card/subcategory-card.component';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  imports: [Tag, Card, DatePipe, CategoryDetailsLoaderComponent, SubcategoryCardComponent],
})
export class CategoryDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private categoriesService = inject(CategoriesService);

  isLoading: WritableSignal<boolean> = signal(false);
  category: WritableSignal<Category | null> = signal(null);
  constructor() {}

  ngOnInit() {
    this.getCategoryId();
  }

  getCategoryId() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getCategoryDetails(id);
      } else {
        this.category.set(null);
      }
    });
  }

  getCategoryDetails(id: string) {
    this.isLoading.set(true);
    this.categoriesService
      .getCategoryById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Category) => {
          this.isLoading.set(false);
          this.category.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.category.set(null);
        },
      });
  }
}
