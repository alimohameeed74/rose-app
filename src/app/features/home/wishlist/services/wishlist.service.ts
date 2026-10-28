import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { Product } from '../../products/models/product.js';
import { ApiResponse } from '../../../../core/models/api-response.js';
import { AddtowishlistResponse } from '../../products/models/addtowishlist-response.js';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}
  getUserWishlist() {}
  clearUserWishlist() {}
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
  clearItem() {}
}
