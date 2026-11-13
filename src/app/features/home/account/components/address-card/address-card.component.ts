import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Address } from '../../models/address.js';
import { AddressService } from '../../services/address/address.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';
import { MessageService } from 'primeng/api';

import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css'],
  imports: [ButtonDirective, AddressDialogComponent],
})
export class AddressCardComponent implements OnInit {
  private addressService = inject(AddressService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  address: InputSignal<Address> = input.required();
  deleteLoading: WritableSignal<boolean> = signal(false);
  openDialog: WritableSignal<boolean> = signal(false);
  step: WritableSignal<number> = signal(1);

  onAddressDeleted = output<void>();
  onAddressUpdated = output<void>();

  constructor() {}

  ngOnInit() {}

  deleteAddress(id: string) {
    this.deleteLoading.set(true);
    this.addressService
      .deleteAddress(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted successfully.',
            detail: `${res.message}`,
          });
          this.onAddressDeleted.emit();
        },
      });
  }

  increaseStep() {
    this.step.set(this.step() + 1);
  }

  decreaseStep() {
    this.step.set(this.step() - 1);
  }

  openModal() {
    this.openDialog.set(true);
  }

  closeModal() {
    this.openDialog.set(false);
  }

  updatedAddress() {
    this.onAddressUpdated.emit();
  }
}
