import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { ButtonModule, ButtonDirective } from 'primeng/button';
import { ToggleThemeComponent } from '../../../../shared/components/toggle-theme/toggle-theme.component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [InputTextModule, RouterLink, ButtonDirective, ToggleThemeComponent],
})
export class SigninComponent implements OnInit {
  hidePassword: WritableSignal<boolean> = signal(true);
  constructor() {}

  ngOnInit() {}

  togglePassword() {
    this.hidePassword.update((v) => !v);
  }
}
