import { MessageService } from 'primeng/api';
import { AccountService } from './../../services/account/account.service';
import { Component, inject, OnInit, DestroyRef, WritableSignal, signal } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { Select } from 'primeng/select';
import { Gender } from '../../../../auth/enums/gender.enum.js';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../../auth/models/response/auth-response.js';
import { ErrMessComponent } from '../../../../../shared/components/err-mess/err-mess.component';
import { UpdateUserProfile } from '../../models/update-user-profile.js';
import { LoggedUserData } from '../../../../auth/models/store/logged-user-data.js';
import { AuthService } from '../../../../auth/services/auth.service.js';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Dialog } from 'primeng/dialog';
import { InputOtp } from 'primeng/inputotp';
import { VerifyEmail } from '../../../../auth/models/response/verify-email.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    InputText,
    ButtonDirective,
    Select,
    ReactiveFormsModule,
    ErrMessComponent,
    ConfirmDialogComponent,
    Dialog,
    InputOtp,
  ],
})
export class ProfileComponent implements OnInit {
  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  readonly gender = Gender;
  readonly genders = [
    { label: 'Male', value: this.gender.MALE },
    { label: 'female', value: this.gender.FAMEALE },
  ];
  selectedPhoto!: File;
  openConfirmDialog: WritableSignal<boolean> = signal(false);
  openEmailDialog: WritableSignal<boolean> = signal(false);
  emailLoading: WritableSignal<boolean> = signal(false);
  otpLoading: WritableSignal<boolean> = signal(false);
  step: WritableSignal<number> = signal(1);

  profileForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    gender: [this.gender.MALE],
  });

  EmailForm = this.fb.nonNullable.group({
    newEmail: ['', [Validators.required, Validators.email]],
  });

  otpForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  constructor() {}

  get emailController() {
    return this.profileForm.get('email')!;
  }

  get firstNameController() {
    return this.profileForm.get('firstName')!;
  }

  get lastNameController() {
    return this.profileForm.get('lastName')!;
  }
  get phoneController() {
    return this.profileForm.get('phone')!;
  }
  get genderController() {
    return this.profileForm.get('gender')!;
  }
  get newEmailController() {
    return this.EmailForm.get('newEmail')!;
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.accountService
      .getUserProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: User) => {
          this.profileForm.patchValue({
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            gender: res.gender,
            phone: res.phone ? `0${res.phone?.slice(1)}` : '012********',
          });
          this.genderController.disable();
          this.emailController.disable();
        },
      });
  }

  updateProfile() {
    const form = this.profileForm.getRawValue();
    const data: UpdateUserProfile = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: `+${form.phone.slice(1)}`,
      photo: '',
    };
    this.sendForm(data);
  }

  sendForm(data: UpdateUserProfile) {
    this.accountService
      .updateUserProfile(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: User) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated successfully.',
            detail: 'your profile is updated.',
          });
          this.resetAll();
          const updatedUser: LoggedUserData = {
            email: res.email,
            role: res.role,
            userId: res.id,
            username: res.username,
          };
          this.authService.setUser(updatedUser, true);
          this.getUserProfile();
        },
      });
  }

  resetAll() {
    this.profileForm.reset();
  }

  showConfirmDialog() {
    this.openConfirmDialog.set(true);
  }
  hideConfirmDialog() {
    this.openConfirmDialog.set(false);
  }

  openEmailModal() {
    this.openEmailDialog.set(true);
  }

  closeEmailModal() {
    this.openEmailDialog.set(false);
    this.resetEmailForm();
    this.resetOtpForm();
  }

  submit() {
    if (this.step() === 1) {
      this.requestEmailChange();
    } else if (this.step() === 2) {
      this.confirmEmailChange();
    }
  }

  requestEmailChange() {
    this.emailLoading.set(true);
    this.accountService
      .requestEmailChange(this.EmailForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: VerifyEmail) => {
          this.emailLoading.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Completed successfully.',
            detail: `${res.message}`,
          });
          this.increaseStep();
        },
        error: (err) => {
          this.emailLoading.set(false);
        },
      });
  }
  confirmEmailChange() {
    this.otpLoading.set(true);
    this.accountService
      .confirmEmailChange(this.otpForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: User) => {
          this.otpLoading.set(false);
          console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Updated successfully.',
            detail: 'Email Updated Successfully',
          });
          this.closeEmailModal();
          this.getUserProfile();
        },
        error: (err) => {
          this.otpLoading.set(false);
        },
      });
  }

  increaseStep() {
    this.step.set(this.step() + 1);
  }
  decreaseStep() {
    this.step.set(this.step() - 1);
  }

  resetEmailForm() {
    this.EmailForm.reset();
  }
  resetOtpForm() {
    this.otpForm.reset();
  }
}
