import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../../core/services/loading/loading.service.js';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports: [ProgressSpinnerModule],
})
export class LoaderComponent implements OnInit {
  loadingService = inject(LoadingService);
  constructor() {}

  ngOnInit() {}
}
