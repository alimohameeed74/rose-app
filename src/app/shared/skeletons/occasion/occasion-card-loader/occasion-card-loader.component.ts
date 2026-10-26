import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Card } from 'primeng/card';
@Component({
  selector: 'app-occasion-card-loader',
  templateUrl: './occasion-card-loader.component.html',
  styleUrls: ['./occasion-card-loader.component.css'],
  imports: [Skeleton, Card],
})
export class OccasionCardLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
