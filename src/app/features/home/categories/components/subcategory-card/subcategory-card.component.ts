import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Subcategory } from '../../models/subcategory.js';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { ButtonDirective } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategory-card',
  templateUrl: './subcategory-card.component.html',
  styleUrls: ['./subcategory-card.component.css'],
  imports: [Card, Tag, ButtonDirective, DatePipe],
})
export class SubcategoryCardComponent implements OnInit {
  private router = inject(Router);

  subcategory: InputSignal<Subcategory> = input.required();
  constructor() {}

  ngOnInit() {}

  goToDetails(id: string) {
    this.router.navigate(['/main/categories/subcategories', id]);
  }
}
