import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { Product } from '../../../products/models/product.js';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { AddtocartResponse } from '../../../products/models/addtocart-response.js';
import { CartItem } from '../../models/cart.js';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);

  private cartItemsCount: WritableSignal<number> = signal(0);
  cartItemsCount_ = this.cartItemsCount.asReadonly();

  constructor() {}

  getUserCart(): Observable<CartItem[]> {
    return this.httpClient
      .get<ApiResponse<{ cartItems: CartItem[] }>>(`${this.configService.devApiUrl_()}/cart`)
      .pipe(map((res) => res.payload.cartItems));
  }
  clearUserCart(): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(`${this.configService.devApiUrl_()}/cart`);
  }
  addItem(productId: string): Observable<Product> {
    return this.httpClient
      .post<ApiResponse<{ cartItem: AddtocartResponse }>>(
        `${this.configService.devApiUrl_()}/cart`,
        {
          productId,
          quantity: 1,
        },
      )
      .pipe(map((res) => res.payload.cartItem.product));
  }
  deleteItem(id: string): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(`${this.configService.devApiUrl_()}/cart/${id}`);
  }
  updateItemQuantity(id: string, quantity: number): Observable<CartItem> {
    return this.httpClient
      .patch<ApiResponse<{ cartItem: CartItem }>>(`${this.configService.devApiUrl_()}/cart/${id}`, {
        quantity,
      })
      .pipe(map((res) => res.payload.cartItem));
  }

  setCartItemsCount(count: number) {
    this.cartItemsCount.set(count);
  }
  increaseCartItemsCount() {
    this.setCartItemsCount(this.cartItemsCount() + 1);
  }
}
