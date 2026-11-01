import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CartItem } from '../../models/cart.js';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';

@Component({
  selector: 'app-product-cart-card',
  templateUrl: './product-cart-card.component.html',
  styleUrls: ['./product-cart-card.component.css'],
  imports: [ButtonDirective, CurrencyPipe],
})
export class ProductCartCardComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  private messageService = inject(MessageService);

  cartItem: InputSignal<CartItem> = input.required();
  onItemDeleted = output<void>();
  onItemUpdated = output<void>();
  deleteLoading: WritableSignal<boolean> = signal(false);
  updatedLoading: WritableSignal<boolean> = signal(false);
  quantity: WritableSignal<number> = signal(1);
  checks: WritableSignal<boolean> = signal(false);
  constructor() {}

  ngOnInit() {}

  deleteItem(id: string) {
    this.deleteLoading.set(true);
    this.cartService
      .deleteItem(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.deleteLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted successfully.',
            detail: `${res.message}`,
          });
          this.onItemDeleted.emit();
        },
        error: (err) => {
          this.deleteLoading.set(false);
        },
      });
  }
  increaseQuantity() {
    this.showChecks();
    if (this.quantity() < this.cartItem().product.stock) {
      this.quantity.set(this.quantity() + 1);
    }
  }
  decreasQuantity() {
    this.showChecks();
    if (this.quantity() !== 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  updateItemQuantity() {
    this.updatedLoading.set(true);
    this.cartService
      .updateItemQuantity(this.cartItem().id, this.quantity())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: CartItem) => {
          this.updatedLoading.set(false);

          this.resetQuantity();
          this.onItemUpdated.emit();
        },
        error: (err) => {
          this.updatedLoading.set(false);
        },
      });
  }

  resetQuantity() {
    this.quantity.set(1);
    this.hideChecks();
  }

  showChecks() {
    this.checks.set(true);
  }

  hideChecks() {
    this.checks.set(false);
  }
}
