import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service.js';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [JsonPipe],
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);

  constructor() {}

  ngOnInit() {}
}
