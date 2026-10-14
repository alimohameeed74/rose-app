import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule, Toast } from 'primeng/toast';
import { AuthService } from './features/auth/services/auth.service.js';
import { AttentionDialogComponent } from './shared/components/attention-dialog/attention-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, AttentionDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.init();
  }
}
