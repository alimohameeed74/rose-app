import { AddressService } from './../../services/address/address.service';
import { Component, OnInit, signal, WritableSignal, inject, DestroyRef } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Address } from '../../models/address.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddressCardComponent } from '../../components/address-card/address-card.component';
import { AddressCardLoaderComponent } from '../../../../../shared/skeletons/address/address-card-loader/address-card-loader.component';

import { AddressDialogComponent } from '../../components/address-dialog/address-dialog.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  imports: [
    ButtonDirective,
    AddressCardComponent,
    AddressCardLoaderComponent,

    AddressDialogComponent,
  ],
})
export class AddressesComponent implements OnInit {
  private addressService = inject(AddressService);
  private destroyRef = inject(DestroyRef);

  addresses: WritableSignal<Address[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  openDialog: WritableSignal<boolean> = signal(false);
  step: WritableSignal<number> = signal(1);

  constructor() {}

  ngOnInit() {
    this.getUserAddresses();
  }

  getUserAddresses() {
    this.isLoading.set(true);
    this.addressService
      .getUserAddresses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Address[]) => {
          this.isLoading.set(false);
          this.addresses.set(res);
        },
        error: (err) => {
          this.isLoading.set(false);
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

  createAddress() {
    this.closeModal();
    this.getUserAddresses();
  }
}
