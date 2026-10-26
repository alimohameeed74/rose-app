import { Component, inject, OnInit, signal, WritableSignal, DestroyRef } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Product } from '../../models/product.js';
import { ProductService } from '../../services/product.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductCardLoaderComponent } from '../../../../../shared/skeletons/product/product-card-loader/product-card-loader.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [ProductListComponent, ProductCardLoaderComponent],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  isLoading: WritableSignal<boolean> = signal(false);
  products: WritableSignal<Product[]> = signal([]);

  constructor() {}

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.isLoading.set(true);
    this.productService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Product[]) => {
          this.isLoading.set(false);
          this.products.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.products.set([]);
        },
      });
  }
}
