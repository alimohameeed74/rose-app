import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../core/services/config/config.service.js';
import { Metadata, Occasion } from '../models/occasion.js';
import { ApiResponse } from '../../../../core/models/api-response.js';

@Injectable({
  providedIn: 'root',
})
export class OccasionService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);
  constructor() {}
  getAll(): Observable<Occasion[]> {
    return this.httpClient
      .get<ApiResponse<{ data: Occasion[]; metadata: Metadata }>>(
        `${this.configService.devApiUrl_()}/occasions?page=1&limit=20`,
      )
      .pipe(map((res) => res.payload.data));
  }
  getById(id: string): Observable<Occasion> {
    return this.httpClient
      .get<ApiResponse<{ occasion: Occasion }>>(
        `${this.configService.devApiUrl_()}/occasions/${id}`,
      )
      .pipe(map((res) => res.payload.occasion));
  }
}
