import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config/config.service.js';
import { map, Observable } from 'rxjs';
import { Address } from '../../models/address.js';
import { ApiResponse } from '../../../../../core/models/api-response.js';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';
import { CreateAddress } from '../../models/create-address.js';
import { UpdateAddress } from '../../models/update-address.js';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private httpClient = inject(HttpClient);
  private configService = inject(ConfigService);

  constructor() {}

  getUserAddresses(): Observable<Address[]> {
    return this.httpClient
      .get<ApiResponse<{ addresses: Address[] }>>(`${this.configService.devApiUrl_()}/addresses`)
      .pipe(map((res) => res.payload.addresses));
  }
  deleteAddress(id: string): Observable<VerifyEmail> {
    return this.httpClient.delete<VerifyEmail>(
      `${this.configService.devApiUrl_()}/addresses/${id}`,
    );
  }

  createAddress(data: CreateAddress): Observable<Address> {
    return this.httpClient
      .post<ApiResponse<{ address: Address }>>(`${this.configService.devApiUrl_()}/addresses`, data)
      .pipe(map((res) => res.payload.address));
  }
  updateAddress(id: string, data: UpdateAddress): Observable<Address> {
    return this.httpClient
      .patch<ApiResponse<{ address: Address }>>(
        `${this.configService.devApiUrl_()}/addresses/${id}`,
        data,
      )
      .pipe(map((res) => res.payload.address));
  }
}
