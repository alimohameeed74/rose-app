import { Injectable, signal, WritableSignal } from '@angular/core';
import { ThemeMode } from '../../enums/theme-mode.enum.js';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly themeMode = ThemeMode;
  private mode: WritableSignal<ThemeMode> = signal(this.themeMode.LIGHT);
  readonly mode_ = this.mode.asReadonly();
  constructor() {}
  init() {
    const theme = localStorage.getItem('roseTheme') as ThemeMode;
    document.documentElement.classList.remove('dark');
    if (theme) {
      this.setTheme(theme);
      if (this.mode() === this.themeMode.DARK) {
        document.documentElement.classList.add('dark');
      }
    } else {
      this.setTheme(this.themeMode.LIGHT);
    }
  }

  setTheme(mode: ThemeMode): void {
    this.mode.set(mode);
    localStorage.setItem('roseTheme', mode);
  }
}
