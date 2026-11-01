import { Component, input, InputSignal, OnInit, output } from '@angular/core';
import { Coupon } from '../../models/coupon.js';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.css'],
  imports: [CurrencyPipe, ButtonDirective, DatePipe],
})
export class CouponCardComponent implements OnInit {
  coupon: InputSignal<Coupon> = input.required();
  onCouponApplied = output<string>();
  constructor() {}

  ngOnInit() {}

  applyCoupon(discountValue: string) {
    this.onCouponApplied.emit(discountValue);
  }
}
