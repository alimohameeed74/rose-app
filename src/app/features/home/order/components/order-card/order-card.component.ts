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
import { Tag } from 'primeng/tag';
import { Checkout, Order } from '../../models/order.js';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderItemCardComponent } from '../order-item-card/order-item-card.component';
import { ButtonDirective } from 'primeng/button';
import { CheckoutService } from '../../services/checkout/checkout.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
  imports: [Tag, DatePipe, CurrencyPipe, OrderItemCardComponent, ButtonDirective],
})
export class OrderCardComponent implements OnInit {
  private checkoutService = inject(CheckoutService);
  private destroyRef = inject(DestroyRef);
  order: InputSignal<Order> = input.required();

  checkoutLoading: WritableSignal<boolean> = signal(false);
  constructor() {}

  ngOnInit() {}

  createCheckoutSession() {
    const data = {
      orderId: this.order().id,
      successUrl: 'https://rose-app-ruddy-six.vercel.app/main/orders',
    };
    this.checkoutLoading.set(true);
    this.checkoutService
      .createCheckoutSession(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Checkout | null) => {
          this.checkoutLoading.set(false);
          if (res) {
            window.location.href = res.checkoutUrl;
          }
        },
        error: () => {
          this.checkoutLoading.set(false);
        },
      });
  }
}
