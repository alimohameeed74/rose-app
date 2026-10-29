import { MessageService } from 'primeng/api';
import { AuthService } from './../../../../auth/services/auth.service';
import { ReviewService } from './../../services/review/review.service';
import {
  Component,
  OnInit,
  inject,
  DestroyRef,
  InputSignal,
  input,
  OnChanges,
  WritableSignal,
  signal,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ErrMessComponent } from '../../../../../shared/components/err-mess/err-mess.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Review } from '../../models/review.js';

@Component({
  selector: 'app-product-review-form',
  templateUrl: './product-review-form.component.html',
  styleUrls: ['./product-review-form.component.css'],
  imports: [ButtonDirective, InputText, ReactiveFormsModule, ErrMessComponent],
})
export class ProductReviewFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private reviewService = inject(ReviewService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  productId: InputSignal<string> = input.required();
  onReviewCreate = output<Review>();
  isLoading: WritableSignal<boolean> = signal(false);
  rateClicked: WritableSignal<number> = signal(1);
  reviewForm = this.fb.nonNullable.group({
    productId: [''],
    headline: ['', [Validators.required]],
    content: ['', [Validators.required]],
    rating: [this.rateClicked()],
  });
  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {
    this.reviewForm.patchValue({
      productId: this.productId(),
    });
  }

  get headlineController() {
    return this.reviewForm.get('headline')!;
  }
  get contentController() {
    return this.reviewForm.get('content')!;
  }

  addReview() {
    if (!this.authService.isUserlogged_()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning.',
        detail: 'Please Signin First.',
      });
      return;
    }
    this.isLoading.set(true);
    this.reviewService
      .create(this.reviewForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Review) => {
          this.isLoading.set(false);
          this.resetForm();
          this.onReviewCreate.emit(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully.',
            detail: 'review created successfully.',
          });
        },
        error: (err) => {
          this.isLoading.set(false);
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
    this.reviewForm.reset();
    this.rateClicked.set(1);
  }
}
