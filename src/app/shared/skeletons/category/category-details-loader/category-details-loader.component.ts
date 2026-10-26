import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-category-details-loader',
  templateUrl: './category-details-loader.component.html',
  styleUrls: ['./category-details-loader.component.css'],
  imports: [Card, Skeleton],
})
export class CategoryDetailsLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
