import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ConfigService } from '../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { Product } from '../../products/models/product.js';
import { ApiResponse } from '../../../../core/models/api-response.js';
import { AddtowishlistResponse } from '../../products/models/addtowishlist-response.js';
import { WishlistItem } from '../models/wishlist.js';
import { VerifyEmail } from '../../../auth/models/response/verify-email.js';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);

  private wishlistItemsCount: WritableSignal<number> = signal(0);
  wishlistItemsCount_ = this.wishlistItemsCount.asReadonly();
  constructor() {}
  getUserWishlist(): Observable<WishlistItem[]> {
    return this.httpClient
      .get<ApiResponse<{ wishlistItems: WishlistItem[] }>>(
        `${this.configService.devApiUrl_()}/wishlist`,
      )
      .pipe(map((res) => res.payload.wishlistItems));
  }
  clearUserWishlist(): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(`${this.configService.devApiUrl_()}/wishlist`);
  }
  addItem(productId: string): Observable<Product> {
    return this.httpClient
      .post<ApiResponse<{ wishlistItem: AddtowishlistResponse }>>(
        `${this.configService.devApiUrl_()}/wishlist`,
        {
          productId,
        },
      )
      .pipe(map((res) => res.payload.wishlistItem.product));
  }
  clearItem(id: string): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(`${this.configService.devApiUrl_()}/wishlist/${id}`);
  }

  setWishlistItemsCount(count: number) {
    this.wishlistItemsCount.set(count);
  }
  increaseWishlistItemsCount() {
    this.setWishlistItemsCount(this.wishlistItemsCount() + 1);
  }
}
