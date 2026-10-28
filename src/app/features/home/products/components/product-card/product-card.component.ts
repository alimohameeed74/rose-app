import { WishlistService } from './../../../wishlist/services/wishlist.service';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../../../auth/services/auth.service';
import { CartService } from './../../../cart/services/cart.service';
import { Router } from '@angular/router';
import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Product } from '../../models/product.js';
import { CurrencyPipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CurrencyPipe, Tag, Card, ButtonDirective],
})
export class ProductCardComponent implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  cartLoading: WritableSignal<boolean> = signal(false);
  wishlistLoading: WritableSignal<boolean> = signal(false);
  product: InputSignal<Product> = input.required();
  constructor() {}

  ngOnInit() {}
  viewDetails(id: string) {
    this.router.navigate(['/main/products/details', id]);
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
