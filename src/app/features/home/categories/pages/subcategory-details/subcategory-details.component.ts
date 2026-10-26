import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { SubcategoryDetails } from '../../models/subcategory-details.js';
import { SubcategoryDetailsLoaderComponent } from '../../../../../shared/skeletons/subcategory/subcategory-details-loader/subcategory-details-loader.component.js';
import { ProductListComponent } from '../../../products/components/product-list/product-list.component';

@Component({
  selector: 'app-subcategory-details',
  templateUrl: './subcategory-details.component.html',
  styleUrls: ['./subcategory-details.component.css'],
  imports: [Card, Tag, DatePipe, SubcategoryDetailsLoaderComponent, ProductListComponent],
})
export class SubcategoryDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private categoriesService = inject(CategoriesService);

  isLoading: WritableSignal<boolean> = signal(false);
  subCategory: WritableSignal<SubcategoryDetails | null> = signal(null);
  constructor() {}

  ngOnInit() {
    this.getSubCategoryId();
  }

  getSubCategoryId() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getSubCategoryDetails(id);
      } else {
        this.subCategory.set(null);
      }
    });
  }

  getSubCategoryDetails(id: string) {
    this.isLoading.set(true);
    this.categoriesService
      .getSubCategotyById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.isLoading.set(false);
          this.subCategory.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.subCategory.set(null);
        },
      });
  }
}
