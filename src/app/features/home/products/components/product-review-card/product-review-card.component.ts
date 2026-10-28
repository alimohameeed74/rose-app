import { ReviewService } from './../../services/review/review.service';
import { AuthService } from './../../../../auth/services/auth.service';
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
import { Review } from '../../models/review.js';
import { DatePipe } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-review-card',
  templateUrl: './product-review-card.component.html',
  styleUrls: ['./product-review-card.component.css'],
  imports: [DatePipe, ButtonDirective],
})
export class ProductReviewCardComponent implements OnInit {
  authService = inject(AuthService);
  private reviewService = inject(ReviewService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  review: InputSignal<Review> = input.required();
  deleteLoading: WritableSignal<boolean> = signal(false);
  onDeleteReview = output<void>();
  constructor() {}

  ngOnInit() {}
  deleteReview(id: string) {
    this.deleteLoading.set(true);
    this.reviewService
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.deleteLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully.',
            detail: 'review deleted successfully.',
          });
          this.onDeleteReview.emit();
        },
        error: (err) => {
          this.deleteLoading.set(false);
        },
      });
  }
}
