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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrMessComponent } from '../../../../../shared/components/err-mess/err-mess.component';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-product-review-card',
  templateUrl: './product-review-card.component.html',
  styleUrls: ['./product-review-card.component.css'],
  imports: [DatePipe, ButtonDirective, ReactiveFormsModule, ErrMessComponent, InputText],
})
export class ProductReviewCardComponent implements OnInit {
  authService = inject(AuthService);
  private reviewService = inject(ReviewService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  review: InputSignal<Review> = input.required();
  deleteLoading: WritableSignal<boolean> = signal(false);
  updateLoading: WritableSignal<boolean> = signal(false);
  onDeleteReview = output<void>();
  onUpdateReview = output<void>();
  rateClicked: WritableSignal<number> = signal(1);
  updateReviewClicked: WritableSignal<boolean> = signal(false);
  reviewForm = this.fb.nonNullable.group({
    headline: ['', [Validators.required]],
    rating: [this.rateClicked()],
  });

  constructor() {}

  ngOnInit() {}

  get headlineController() {
    return this.reviewForm.get('headline')!;
  }
  get contentController() {
    return this.reviewForm.get('content')!;
  }

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
  updateReview() {
    this.updateLoading.set(true);
    this.reviewService
      .update(this.review().id, this.reviewForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Review) => {
          this.updateLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully.',
            detail: 'review updated successfully.',
          });
          this.onUpdateReview.emit();
          this.closeAll();
        },
        error: (err) => {
          this.updateLoading.set(false);
        },
      });
  }

  icreaseRate(rate: number) {
    this.rateClicked.set(rate);
    this.reviewForm.patchValue({
      rating: this.rateClicked(),
    });
  }

  resetForm() {
    this.rateClicked.set(1);
    this.reviewForm.reset();
  }

  openUpdateForm() {
    this.updateReviewClicked.set(true);
    this.reviewForm.patchValue({
      headline: this.review().headline,
      rating: this.review().rating,
    });
    this.rateClicked.set(this.review().rating);
  }

  closeUpdateForm() {
    this.updateReviewClicked.set(false);
  }

  closeAll() {
    this.resetForm();
    this.closeUpdateForm();
  }
}
