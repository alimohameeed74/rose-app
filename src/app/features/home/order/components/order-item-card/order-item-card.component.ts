import { Component, input, InputSignal, OnInit } from '@angular/core';
import { OrderItem } from '../../models/order-item.js';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.css'],
  imports: [CurrencyPipe],
})
export class OrderItemCardComponent implements OnInit {
  orderItem: InputSignal<OrderItem> = input.required();
  constructor() {}

  ngOnInit() {}
}
