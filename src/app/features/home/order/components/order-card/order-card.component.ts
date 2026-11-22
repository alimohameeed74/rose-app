import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Order } from '../../models/order.js';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderItemCardComponent } from '../order-item-card/order-item-card.component';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
  imports: [Tag, DatePipe, CurrencyPipe, OrderItemCardComponent, ButtonDirective],
})
export class OrderCardComponent implements OnInit {
  order: InputSignal<Order> = input.required();
  constructor() {}

  ngOnInit() {}
}
