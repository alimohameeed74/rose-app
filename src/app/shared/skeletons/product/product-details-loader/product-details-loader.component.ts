import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-product-details-loader',
  templateUrl: './product-details-loader.component.html',
  styleUrls: ['./product-details-loader.component.css'],
  imports: [Skeleton],
})
export class ProductDetailsLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
