import { WishlistService } from './../../services/wishlist.service';
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
import { WishlistItem } from '../../models/wishlist.js';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-wishlist-card',
  templateUrl: './product-wishlist-card.component.html',
  styleUrls: ['./product-wishlist-card.component.css'],
  imports: [ButtonDirective, CurrencyPipe],
})
export class ProductWishlistCardComponent implements OnInit {
  private wishlistService = inject(WishlistService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  wishlistItem: InputSignal<WishlistItem> = input.required();
  onWishlistItemDeleted = output<void>();

  deleteLoading: WritableSignal<boolean> = signal(false);
  constructor() {}

  ngOnInit() {}

  deleteWishlistItem(id: string) {
    this.deleteLoading.set(true);
    this.wishlistService
      .clearItem(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.deleteLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted successfully.',
            detail: `${res.message}`,
          });
          this.onWishlistItemDeleted.emit();
        },
        error: (err) => {
          this.deleteLoading.set(false);
        },
      });
  }
}
