import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private httpClient = inject(HttpClient);

  private config: WritableSignal<any> = signal(null);
  readonly devApiUrl_ = computed(() => this.config().apiUrl.devUrl);
  readonly productionApiUrl_ = computed(() => this.config().apiUrl.productionUrl);
  constructor() {}

  loadConfig(): Observable<any> {
    return this.httpClient.get<any>('./config.json').pipe(
      tap((url) => {
        this.config.set(url);
      }),
    );
  }
}
