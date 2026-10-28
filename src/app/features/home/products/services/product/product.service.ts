import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { Product } from '../../models/product.js';
import { Metadata } from '../../../occasions/models/occasion.js';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}
  getAll(): Observable<Product[]> {
    return this.httpClient
      .get<ApiResponse<{ data: Product[]; metadata: Metadata }>>(
        `${this.configService.devApiUrl_()}/products?page=1&limit=100`,
      )
      .pipe(map((res) => res.payload.data));
  }
  getById(id: string): Observable<Product> {
    return this.httpClient
      .get<ApiResponse<{ product: Product }>>(`${this.configService.devApiUrl_()}/products/${id}`)
      .pipe(map((res) => res.payload.product));
  }
}
