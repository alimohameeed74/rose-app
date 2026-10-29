import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { AddProductReview, UpdateProductReview } from '../../models/add-product-review.js';
import { map, Observable } from 'rxjs';
import { Review } from '../../models/review.js';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}

  create(data: AddProductReview): Observable<Review> {
    return this.httpClient
      .post<ApiResponse<{ review: Review }>>(`${this.configService.devApiUrl_()}/reviews`, data)
      .pipe(map((res) => res.payload.review));
  }
  update(id: string, data: UpdateProductReview): Observable<Review> {
    return this.httpClient
      .patch<ApiResponse<{ review: Review }>>(
        `${this.configService.devApiUrl_()}/reviews/${id}`,
        data,
      )
      .pipe(map((res) => res.payload.review));
  }
  delete(id: string): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(`${this.configService.devApiUrl_()}/reviews/${id}`);
  }
}
