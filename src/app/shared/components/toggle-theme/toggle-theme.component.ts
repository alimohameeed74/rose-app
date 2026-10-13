import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ThemeService } from '../../../core/services/theme/theme.service.js';
import { ThemeMode } from '../../../core/enums/theme-mode.enum.js';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.css'],
})
export class ToggleThemeComponent implements OnInit {
  theme = inject(ThemeService);

  readonly themeMode = ThemeMode;

  ifDark: WritableSignal<boolean> = signal(false);

  constructor() {}

  ngOnInit() {
    if (this.theme.mode_() === this.themeMode.DARK) {
      this.ifDark.set(true);
    } else {
      this.ifDark.set(false);
    }
  }

  toggleMode() {
    this.ifDark.update((v) => !v);
    if (this.ifDark()) {
      // dark
      this.theme.setTheme(this.themeMode.DARK);
    } else {
      // light
      this.theme.setTheme(this.themeMode.LIGHT);
    }
    document.documentElement.classList.toggle('dark');
  }
}
