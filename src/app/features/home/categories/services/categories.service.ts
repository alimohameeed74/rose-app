import { ConfigService } from './../../../../core/services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response.js';
import { Category } from '../models/category.js';
import { Metadata } from '../../occasions/models/occasion.js';
import { SubcategoryDetails } from '../models/subcategory-details.js';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<{ data: Category[]; metadata: Metadata }>>(
        `${this.configService.devApiUrl_()}/categories?page=1&limit=50`,
      )
      .pipe(map((res) => res.payload.data));
  }
  getCategoryById(id: string): Observable<Category> {
    return this.httpClient
      .get<ApiResponse<{ category: Category }>>(
        `${this.configService.devApiUrl_()}/categories/${id}`,
      )
      .pipe(map((res) => res.payload.category));
  }
  getSubCategotyById(id: string): Observable<SubcategoryDetails> {
    return this.httpClient
      .get<ApiResponse<{ subCategory: SubcategoryDetails }>>(
        `${this.configService.devApiUrl_()}/sub-categories/${id}`,
      )
      .pipe(map((res) => res.payload.subCategory));
  }
}
