import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { Checkout } from '../../models/order.js';
import { ApiResponse } from '../../../../../core/models/api-response.js';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}

  createCheckoutSession(data: {
    orderId: string;
    successUrl: string;
  }): Observable<Checkout | null> {
    return this.httpClient
      .post<ApiResponse<Checkout>>(
        `${this.configService.devApiUrl_()}/payments/checkout-session`,
        data,
      )
      .pipe(map((res) => res.payload));
  }
}
