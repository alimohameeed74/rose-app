import { ProductService } from '../../services/product/product.service';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { CartService } from '../../../cart/services/cart.service.js';
import { WishlistService } from '../../../wishlist/services/wishlist.service.js';
import { AuthService } from '../../../../auth/services/auth.service.js';
import { MessageService } from 'primeng/api';
import { ProductDetailsLoaderComponent } from '../../../../../shared/skeletons/product/product-details-loader/product-details-loader.component';
import { ProductReviewCardComponent } from '../../components/product-review-card/product-review-card.component';
import { ProductReviewFormComponent } from '../../components/product-review-form/product-review-form.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    CurrencyPipe,
    ButtonDirective,
    ProductDetailsLoaderComponent,
    ProductReviewCardComponent,
    ProductReviewFormComponent,
  ],
})
export class ProductDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  cartLoading: WritableSignal<boolean> = signal(false);
  wishlistLoading: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  product: WritableSignal<Product | null> = signal(null);

  productGallery = computed<string[]>(() => {
    const gallery = this.product()?.gallery;

    if (!gallery) {
      return [];
    }

    try {
      const images = JSON.parse(gallery);

      return Array.isArray(images)
        ? images.filter(
            (image): image is string => typeof image === 'string' && image.trim().length > 0,
          )
        : [];
    } catch {
      return [];
    }
  });
  constructor() {}
  ngOnInit() {
    this.getProductId();
  }

  getProductId() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getProductDetails(id);
      } else {
        this.product.set(null);
      }
    });
  }

  getProductDetails(id: string) {
    this.isLoading.set(true);
    this.productService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.isLoading.set(false);
          this.product.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.product.set(null);
        },
      });
  }
  addToCart(productId: string) {
    if (!this.authService.isUserlogged_()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning.',
        detail: 'Please Signin First.',
      });
      return;
    }
    this.cartLoading.set(true);
    this.cartService
      .addItem(productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Product) => {
          this.cartLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Added successfully.',
            detail: 'product added to your cart.',
          });
        },
        error: (err) => {
          this.cartLoading.set(false);
        },
      });
  }
  addToWishlist(productId: string) {
    if (!this.authService.isUserlogged_()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning.',
        detail: 'Please Signin First.',
      });
      return;
    }
    this.wishlistLoading.set(true);
    this.wishlistService
      .addItem(productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.wishlistLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Added successfully.',
            detail: 'product added to your wishlist.',
          });
        },
        error: (err) => {
          this.wishlistLoading.set(false);
        },
      });
  }
}
