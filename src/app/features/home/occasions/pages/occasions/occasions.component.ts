import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Occasion } from '../../models/occasion.js';
import { OccasionCardComponent } from '../../components/occasion-card/occasion-card.component';
import { OccasionCardLoaderComponent } from '../../../../../shared/skeletons/occasion/occasion-card-loader/occasion-card-loader.component.js';
import { OccasionService } from '../../services/occasion.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-occasions',
  templateUrl: './occasions.component.html',
  styleUrls: ['./occasions.component.css'],
  imports: [FormsModule, OccasionCardComponent, OccasionCardLoaderComponent],
})
export class OccasionsComponent implements OnInit {
  private occasionService = inject(OccasionService);
  private destroyRef = inject(DestroyRef);

  isLoading: WritableSignal<boolean> = signal(false);
  occasions: WritableSignal<Occasion[]> = signal([]);
  constructor() {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.isLoading.set(true);
    this.occasionService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Occasion[]) => {
          this.isLoading.set(false);

          this.occasions.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.occasions.set([]);
        },
      });
  }
}
