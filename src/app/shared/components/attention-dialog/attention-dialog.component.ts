import { Component, inject, OnInit } from '@angular/core';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { AuthService } from '../../../features/auth/services/auth.service.js';
import { DailogService } from '../../services/attention-dialog/dailog.service.js';

@Component({
  selector: 'app-attention-dialog',
  templateUrl: './attention-dialog.component.html',
  styleUrls: ['./attention-dialog.component.css'],
  imports: [Dialog, ButtonDirective],
})
export class AttentionDialogComponent implements OnInit {
  private authService = inject(AuthService);
  readonly dailogService = inject(DailogService);
  constructor() {}

  ngOnInit() {}

  signout() {
    this.dailogService.hide();
    this.authService.signout();
  }
}
