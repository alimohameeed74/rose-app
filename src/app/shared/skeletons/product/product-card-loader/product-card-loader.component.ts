import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-product-card-loader',
  templateUrl: './product-card-loader.component.html',
  styleUrls: ['./product-card-loader.component.css'],
  imports: [Card, Skeleton],
})
export class ProductCardLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
