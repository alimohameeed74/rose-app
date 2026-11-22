import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-order-card-skeleton',
  templateUrl: './order-card-skeleton.component.html',
  styleUrls: ['./order-card-skeleton.component.css'],
  imports: [Skeleton],
})
export class OrderCardSkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
