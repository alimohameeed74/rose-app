import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DailogService {
  visible: WritableSignal<boolean> = signal(false);
  constructor() {}

  show() {
    this.visible.set(true);
  }
  hide() {
    this.visible.set(false);
  }
}
