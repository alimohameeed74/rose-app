import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Occasion } from '../../models/occasion.js';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-occasion-card',
  templateUrl: './occasion-card.component.html',
  styleUrls: ['./occasion-card.component.css'],
  imports: [Card, ButtonDirective, DatePipe],
})
export class OccasionCardComponent implements OnInit {
  private router = inject(Router);

  occasion: InputSignal<Occasion> = input.required();
  constructor() {}

  ngOnInit() {}

  viewDetails(id: string): void {
    this.router.navigate([`/main/occasions/details/${id}`]);
  }
}
