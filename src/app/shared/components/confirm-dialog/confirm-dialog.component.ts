import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { AuthService } from '../../../features/auth/services/auth.service.js';
import { ButtonDirective } from 'primeng/button';
import { AccountService } from '../../../features/home/account/services/account/account.service.js';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyEmail } from '../../../features/auth/models/response/verify-email.js';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  imports: [Dialog, ButtonDirective],
})
export class ConfirmDialogComponent implements OnInit {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  onDialogHide = output<void>();
  isLoading: WritableSignal<boolean> = signal(false);
  constructor() {}

  ngOnInit() {}

  signout() {
    this.authService.signout();
    this.closeDialog();
  }

  closeDialog() {
    this.onDialogHide.emit();
  }

  deleteAccount() {
    this.isLoading.set(true);
    this.accountService
      .deleteAccount()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully.',
            detail: `${res.message}`,
          });
          this.signout();
        },
      });
  }
}
