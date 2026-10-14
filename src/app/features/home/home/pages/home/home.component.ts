import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service.js';
import { JsonPipe } from '@angular/common';
import { ToggleThemeComponent } from '../../../../../shared/components/toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [JsonPipe, ToggleThemeComponent],
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);

  constructor() {}

  ngOnInit() {}
}
