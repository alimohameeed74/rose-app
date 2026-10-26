import { Router } from '@angular/router';
import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Product } from '../../models/product.js';
import { CurrencyPipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CurrencyPipe, Tag, Card, ButtonDirective],
})
export class ProductCardComponent implements OnInit {
  private router = inject(Router);

  product: InputSignal<Product> = input.required();
  constructor() {}

  ngOnInit() {}
  viewDetails(id: string) {
    this.router.navigate(['/main/products/details', id]);
  }
}
