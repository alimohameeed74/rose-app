import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-address-card-loader',
  templateUrl: './address-card-loader.component.html',
  styleUrls: ['./address-card-loader.component.css'],
  imports: [Skeleton],
})
export class AddressCardLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
