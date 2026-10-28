import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfigService } from '../../../../core/services/config/config.service.js';
import { Product } from '../../products/models/product.js';
import { ApiResponse } from '../../../../core/models/api-response.js';
import { AddtocartResponse } from '../../products/models/addtocart-response.js';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}

  getUserCart() {}
  clearUserCart() {}
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
  deleteItem() {}
  updateItemQuantity() {}
}
