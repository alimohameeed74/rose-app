import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { ProductWishlistCardComponent } from '../../components/product-wishlist-card/product-wishlist-card.component';
import { WishlistItem } from '../../models/wishlist.js';
import { WishlistService } from '../../services/wishlist.service.js';
import { AuthService } from '../../../../auth/services/auth.service.js';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WishlistCardLoaderComponent } from '../../../../../shared/skeletons/wishlist/wishlist-card-loader/wishlist-card-loader.component';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [ButtonDirective, ProductWishlistCardComponent, WishlistCardLoaderComponent],
})
export class WishlistComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private wishlistService = inject(WishlistService);
  authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  wishlist: WritableSignal<WishlistItem[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  clearLoading: WritableSignal<boolean> = signal(false);
  constructor() {}

  ngOnInit() {
    this.getUserWishlist();
  }
  getUserWishlist() {
    this.isLoading.set(true);
    this.wishlistService
      .getUserWishlist()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: WishlistItem[]) => {
          this.isLoading.set(false);
          this.wishlist.set(res);
          this.wishlistService.setWishlistItemsCount(res.length);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }

  clearUserWishlist() {
    this.clearLoading.set(true);
    this.wishlistService
      .clearUserWishlist()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Cleared successfully.',
            detail: `${res.message}`,
          });
          this.clearLoading.set(false);
          this.wishlist.set([]);
          this.wishlistService.setWishlistItemsCount(0);
        },
        error: (err) => {
          this.clearLoading.set(false);
        },
      });
  }

  goToSignIn() {
    this.router.navigate(['/auth/signin']);
  }
  goToProducts() {
    this.router.navigate(['/main/products']);
  }
}
