import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-wishlist-card-loader',
  templateUrl: './wishlist-card-loader.component.html',
  styleUrls: ['./wishlist-card-loader.component.css'],
  imports: [Skeleton],
})
export class WishlistCardLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
