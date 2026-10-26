import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-category-card-loader',
  templateUrl: './category-card-loader.component.html',
  styleUrls: ['./category-card-loader.component.css'],
  imports: [Skeleton, Card],
})
export class CategoryCardLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
