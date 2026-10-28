import { Component, DestroyRef, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Occasion } from '../../models/occasion.js';
import { OccasionService } from '../../services/occasion.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { OccasionDetailsLoaderComponent } from '../../../../../shared/skeletons/occasion/occasion-details-loader/occasion-details-loader.component.js';

@Component({
  selector: 'app-occasion-details',
  templateUrl: './occasion-details.component.html',
  styleUrls: ['./occasion-details.component.css'],
  imports: [ButtonDirective, Card, Tag, DatePipe, OccasionDetailsLoaderComponent],
})
export class OccasionDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private occasionService = inject(OccasionService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isLoading: WritableSignal<boolean> = signal(false);
  occasion: WritableSignal<Occasion | null> = signal(null);
  constructor() {}

  ngOnInit() {
    this.getOccasionId();
  }
  getOccasionId() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getOccasionDetails(id);
      } else {
        this.occasion.set(null);
      }
    });
  }

  getOccasionDetails(id: string) {
    this.isLoading.set(true);
    this.occasionService
      .getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Occasion) => {
          this.isLoading.set(false);
          this.occasion.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.occasion.set(null);
        },
      });
  }

  BackToOccasions() {
    this.router.navigate(['/main/occasions']);
  }
}
