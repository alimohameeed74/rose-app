import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { CreateOrder } from '../../models/create-order.js';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { Checkout, Order } from '../../models/order.js';
import { Metadata } from '../../../occasions/models/occasion.js';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);

  constructor() {}

  createOrder(data: CreateOrder): Observable<Checkout | null> {
    return this.httpClient
      .post<ApiResponse<{ order: Order; checkout: Checkout | null }>>(
        `${this.configService.devApiUrl_()}/orders`,
        data,
      )
      .pipe(map((res) => res.payload.checkout));
  }
  getOrders(): Observable<Order[]> {
    return this.httpClient
      .get<ApiResponse<{ data: Order[]; metadata: Metadata }>>(
        `${this.configService.devApiUrl_()}/orders?page=1&limit=40`,
      )
      .pipe(map((res) => res.payload.data));
  }
}
