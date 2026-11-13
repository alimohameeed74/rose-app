import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../models/address.js';
import * as L from 'leaflet';
import { ErrMessComponent } from '../../../../../shared/components/err-mess/err-mess.component';
import { CreateAddress } from '../../models/create-address.js';
import { AddressService } from '../../services/address/address.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { UpdateAddress } from '../../models/update-address.js';

const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css'],
  imports: [Dialog, InputText, ButtonDirective, ReactiveFormsModule, ErrMessComponent],
})
export class AddressDialogComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  isUpdate: InputSignal<boolean> = input.required();
  addressDetails: InputSignal<Address | null> = input.required();
  onDialogClosed = output<void>();
  onAddressCreated = output<void>();
  onAddressUpdated = output<void>();

  private marker?: L.Marker;
  latitude: WritableSignal<number | null> = signal(30.0444);
  longitude: WritableSignal<number | null> = signal(31.2357);
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  private map?: L.Map;
  step: WritableSignal<number> = signal(1);
  submitLoading: WritableSignal<boolean> = signal(false);
  addressForm = this.fb.nonNullable.group({
    title: ['Home'],
    isPrimary: [true],
    city: ['', Validators.required],
    street: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  constructor() {}

  get cityController() {
    return this.addressForm.get('city')!;
  }
  get streetController() {
    return this.addressForm.get('street')!;
  }
  get phoneController() {
    return this.addressForm.get('phone')!;
  }

  ngOnInit() {}
  ngOnChanges(): void {
    if (this.isUpdate()) {
      this.addressForm.patchValue({
        isPrimary: this.addressDetails()!.isPrimary,
        city: this.addressDetails()!.city,
        street: this.addressDetails()!.street,
        title: this.addressDetails()!.title,
        phone: `0${this.addressDetails()!.phone.slice(1)}`,
      });
      this.phoneController.disable();

      this.latitude.set(+this.addressDetails()!.latitude);
      this.longitude.set(+this.addressDetails()!.longitude);
    } else {
      this.addressForm.reset();
      this.latitude.set(30.0444);
      this.longitude.set(31.2357);
    }
  }

  closeModal() {
    this.onDialogClosed.emit();
  }

  increaseStep() {
    this.step.set(this.step() + 1);
    if (this.step() === 2) {
      setTimeout(() => {
        this.initMap();
      });
    }
  }

  decreaseStep() {
    this.map?.remove();
    this.map = undefined;
    this.marker = undefined;
    this.step.set(this.step() - 1);
  }

  submit() {
    if (this.isUpdate()) {
      const form = this.addressForm.getRawValue();
      const data: UpdateAddress = {
        city: form.city,
        isPrimary: form.isPrimary,
        street: form.street,
        title: form.title,
      };
      this.updateAddress(data);
    } else {
      const form = this.addressForm.getRawValue();
      const data: CreateAddress = {
        city: form.city,
        isPrimary: form.isPrimary,
        latitude: this.latitude()!,
        longitude: this.longitude()!,
        phone: `+${form.phone.slice(1)}`,
        street: form.street,
        title: form.title,
      };
      this.createAddress(data);
    }
  }

  createAddress(data: CreateAddress) {
    this.submitLoading.set(true);
    this.addressService
      .createAddress(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Address) => {
          this.submitLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Created successfully.',
            detail: 'Address created successfully',
          });
          this.onAddressCreated.emit();
        },
        error: (err) => {
          this.submitLoading.set(false);
        },
      });
  }
  updateAddress(data: UpdateAddress) {
    this.submitLoading.set(true);
    this.addressService
      .updateAddress(this.addressDetails()!.id, data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Address) => {
          this.submitLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Updated successfully.',
            detail: 'Address updated successfully',
          });
          this.onAddressUpdated.emit();
        },
        error: (err) => {
          this.submitLoading.set(false);
        },
      });
  }

  initMap(): void {
    if (!this.map) {
      const lat = this.latitude();
      const lng = this.longitude();

      const hasLocation = lat !== null && lng !== null;

      this.map = L.map(this.mapContainer.nativeElement).setView(
        hasLocation ? [lat, lng] : [30.0444, 31.2357],
        hasLocation ? 16 : 13,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      // Restore marker in update mode
      if (hasLocation) {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }

      // Handle map click
      this.map.on('click', (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;

        this.latitude.set(lat);
        this.longitude.set(lng);

        if (this.marker) {
          this.marker.setLatLng(event.latlng);
        } else {
          this.marker = L.marker(event.latlng).addTo(this.map!);
        }
      });
    } else {
      this.map.invalidateSize();
    }
  }
}
