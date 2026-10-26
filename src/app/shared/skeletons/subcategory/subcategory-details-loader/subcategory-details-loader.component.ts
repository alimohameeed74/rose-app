import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-subcategory-details-loader',
  templateUrl: './subcategory-details-loader.component.html',
  styleUrls: ['./subcategory-details-loader.component.css'],
  imports: [Card, Skeleton],
})
export class SubcategoryDetailsLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
