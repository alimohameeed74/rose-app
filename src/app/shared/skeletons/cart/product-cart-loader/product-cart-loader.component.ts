import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-product-cart-loader',
  templateUrl: './product-cart-loader.component.html',
  styleUrls: ['./product-cart-loader.component.css'],
  imports: [Skeleton],
})
export class ProductCartLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
