import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Product } from '../../models/product.js';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [ProductCardComponent],
})
export class ProductListComponent implements OnInit {
  products: InputSignal<Product[]> = input.required();
  constructor() {}

  ngOnInit() {}
}
