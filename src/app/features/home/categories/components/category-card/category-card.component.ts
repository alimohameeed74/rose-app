import { DatePipe } from '@angular/common';
import { Component, input, InputSignal, OnInit, inject } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Category } from '../../models/category.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
  imports: [Card, Tag, ButtonDirective, DatePipe],
})
export class CategoryCardComponent implements OnInit {
  private router = inject(Router);

  category: InputSignal<Category> = input.required();
  constructor() {}

  ngOnInit() {}

  goToDetails(id: string) {
    this.router.navigate(['/main/categories/details', id]);
  }
}
