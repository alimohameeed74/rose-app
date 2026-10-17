import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToggleThemeComponent } from '../../shared/components/toggle-theme/toggle-theme.component';
import { AuthService } from '../../features/auth/services/auth.service.js';
import { Menu } from 'primeng/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ToggleThemeComponent, Menu, ToggleThemeComponent, RouterLink, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen: WritableSignal<boolean> = signal(false);
  userName = computed(() => this.authService.loggedUserData_()?.username);
  constructor() {}

  ngOnInit() {}

  toggleMobileMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  userMenuItems: WritableSignal<MenuItem[]> = signal([
    {
      label: this.userName(),
      styleClass:
        'font-bold text-(--primary-color)  text-base border-b border-zinc-100 dark:border-zinc-700/50 pb-2 mb-1 pointer-events-none',
    },
    {
      label: 'Account',
      icon: 'pi pi-user',
      command: () => this.router.navigate(['/account']),
    },
    {
      label: 'Addresses',
      icon: 'pi pi-map-marker',
      command: () => this.router.navigate(['/addresses']),
    },
    {
      label: 'Orders',
      icon: 'pi pi-file',
      command: () => this.router.navigate(['/orders']),
    },

    {
      label: 'Dashboard',
      icon: 'pi pi-cog',
      command: () => this.router.navigate(['/dashboard']),
    },

    {
      label: 'Signout',
      icon: 'pi pi-sign-out',
      styleClass: 'text-red-600 dark:text-red-400 font-medium',
      command: () => this.logout(),
    },
  ]);

  logout() {
    this.authService.signout();
  }

  login() {
    this.router.navigate(['/auth']);
  }
}
