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
import { FormBuilder, FormsModule } from '@angular/forms';
import { Coupon } from '../../models/coupon.js';
import { CouponCardComponent } from '../../components/coupon-card/coupon-card.component';
import { AddressesComponent } from '../../../account/pages/addresses/addresses.component';
import { InputText } from 'primeng/inputtext';
import { OrderService } from '../../../order/services/order.service.js';
import { Checkout } from '../../../order/models/order.js';
import { Dialog } from 'primeng/dialog';

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
    AddressesComponent,
    InputText,
    FormsModule,
    Dialog,
  ],
})
export class CartComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  private couponService = inject(CouponService);
  authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);

  resetBtn: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  clearLoading: WritableSignal<boolean> = signal(false);
  couponLoading: WritableSignal<boolean> = signal(false);
  createOrderLoading: WritableSignal<boolean> = signal(false);
  paymentDialog: WritableSignal<boolean> = signal(false);
  userCart: WritableSignal<CartItem[]> = signal([]);
  coupons: WritableSignal<Coupon[]> = signal([]);
  couponDiscountValue: WritableSignal<number> = signal(0);
  paymentMethod: WritableSignal<string> = signal('');
  selectedAddressId: WritableSignal<string> = signal('');
  checkoutUrl: WritableSignal<string> = signal('');
  orderNote: WritableSignal<string> = signal('');
  step: WritableSignal<number> = signal(0);
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

  orderForm = this.fb.nonNullable.group({
    addressId: [''],
    paymentMethod: [''],
    couponCode: [''],
    notes: [''],
    successUrl: ['http://localhost:4200/main/products/cart'],
  });
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
            summary: 'Cleared successfully.',
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
    this.orderForm.patchValue({
      couponCode: '',
    });
    this.couponDiscountValue.set(0);
    this.resetBtn.set(false);
  }

  recieveDiscount(discount: string, couponCode: string = '') {
    this.showResetBtn();
    this.couponDiscountValue.set(+discount);
    this.orderForm.patchValue({
      couponCode: couponCode,
    });
  }

  increaseStep() {
    this.step.set(this.step() + 1);
  }

  decreaseStep() {
    this.step.set(this.step() - 1);
    if (this.step() <= 2) {
      this.paymentMethod.set('');
    }
    if (this.step() <= 1) {
      this.selectedAddressId.set('');
    }
  }

  getAddressId(id: string) {
    this.selectedAddressId.set(id);
    this.orderForm.patchValue({
      addressId: id,
    });
  }
  getPaymentMethod(method: string) {
    this.paymentMethod.set(method);
    this.orderForm.patchValue({
      paymentMethod: method,
    });
  }

  checkAboutAddress() {
    if (this.selectedAddressId()) {
      this.increaseStep();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: "Can't Complete.",
        detail: `Please Select Address.`,
      });
    }
  }

  checkAboutPaymentMethod() {
    if (this.paymentMethod()) {
      this.createOrder();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: "Can't Complete.",
        detail: `Please Select Payment Method.`,
      });
    }
  }

  createOrder() {
    this.orderForm.patchValue({
      notes: this.orderNote(),
    });
    this.createOrderLoading.set(true);
    this.orderService
      .createOrder(this.orderForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Checkout | null) => {
          this.createOrderLoading.set(false);
          if (res) {
            this.checkoutUrl.set(res.checkoutUrl);
            this.showPaymentDialog();
          } else {
            this.payLater();
          }
        },
        error: () => {
          this.createOrderLoading.set(false);
        },
      });
  }

  showPaymentDialog() {
    this.paymentDialog.set(true);
  }
  hidePaymentDialog() {
    this.paymentDialog.set(false);
  }

  payNow() {
    this.hidePaymentDialog();
    window.location.href = this.checkoutUrl();
  }
  payLater() {
    this.hidePaymentDialog();
    this.messageService.add({
      severity: 'success',
      summary: 'Created successfully.',
      detail: 'Order Has Been Created.',
    });
    this.router.navigate(['/main/orders']);
  }
}
