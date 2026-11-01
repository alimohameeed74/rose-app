import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../auth/services/auth.service.js';
import { CartService } from '../../services/cart/cart.service.js';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartItem } from '../../models/cart.js';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { ProductCartCardComponent } from '../../components/product-cart-card/product-cart-card.component';
import { Router } from '@angular/router';
import { ProductCartLoaderComponent } from '../../../../../shared/skeletons/cart/product-cart-loader/product-cart-loader.component';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';
import { CurrencyPipe } from '@angular/common';
import { CouponService } from '../../services/coupon/coupon.service.js';
import { FormsModule } from '@angular/forms';
import { Coupon } from '../../models/coupon.js';
import { CouponCardComponent } from '../../components/coupon-card/coupon-card.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    ButtonDirective,
    Card,
    ProductCartCardComponent,
    ProductCartLoaderComponent,
    CurrencyPipe,
    FormsModule,
    CouponCardComponent,
  ],
})
export class CartComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  private couponService = inject(CouponService);
  authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  resetBtn: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  clearLoading: WritableSignal<boolean> = signal(false);
  couponLoading: WritableSignal<boolean> = signal(false);
  userCart: WritableSignal<CartItem[]> = signal([]);
  coupons: WritableSignal<Coupon[]> = signal([]);
  couponDiscountValue: WritableSignal<number> = signal(0);
  totalPrice = computed(() => {
    return this.userCart().reduce(
      (acc, item) =>
        acc + item.quantity * +item.product.price * (1 - (+item.product.discountValue || 0) / 100),
      0,
    );
  });
  totalPriceAfterCoupon = computed(
    () => this.totalPrice() * (1 - this.couponDiscountValue() / 100),
  );
  constructor() {}

  ngOnInit() {
    this.getUserCart();
  }
  getUserCart() {
    this.isLoading.set(true);
    this.cartService
      .getUserCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: CartItem[]) => {
          this.isLoading.set(false);
          this.userCart.set(res);
          this.cartService.setCartItemsCount(res.length);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.userCart.set([]);
        },
      });
  }

  clearUserCart() {
    this.clearLoading.set(true);
    this.cartService
      .clearUserCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added successfully.',
            detail: `${res.message}`,
          });
          this.clearLoading.set(false);
          this.userCart.set([]);
          this.cartService.setCartItemsCount(0);
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
  getCoupons() {
    this.couponLoading.set(true);
    this.couponService
      .getAllCoupons()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.couponLoading.set(false);
          this.coupons.set(res);
        },
        error: (err) => {
          this.couponLoading.set(false);
        },
      });
  }

  showResetBtn() {
    this.resetBtn.set(true);
  }
  hideResetBtn() {
    this.couponDiscountValue.set(0);
    this.resetBtn.set(false);
  }

  recieveDiscount(discount: string) {
    this.showResetBtn();
    this.couponDiscountValue.set(+discount);
  }
}
