import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { Coupon } from '../../models/coupon.js';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { Metadata } from '../../../occasions/models/occasion.js';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);

  constructor() {}
  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient
      .get<ApiResponse<{ data: Coupon[]; metadata: Metadata }>>(
        `${this.configService.devApiUrl_()}/coupons?page=1&limit=20&isActive=true`,
      )
      .pipe(map((res) => res.payload.data));
  }
}
