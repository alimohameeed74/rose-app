import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-occasion-details-loader',
  templateUrl: './occasion-details-loader.component.html',
  styleUrls: ['./occasion-details-loader.component.css'],
  imports: [Skeleton, Card],
})
export class OccasionDetailsLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
