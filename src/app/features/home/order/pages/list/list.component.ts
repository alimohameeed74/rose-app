import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Tag } from 'primeng/tag';
import { Order } from '../../models/order.js';
import { OrderService } from '../../services/order/order.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { OrderCardSkeletonComponent } from '../../../../../shared/skeletons/order/order-card-skeleton/order-card-skeleton.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [OrderCardComponent, OrderCardSkeletonComponent],
})
export class ListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private orderService = inject(OrderService);

  isLoading: WritableSignal<boolean> = signal(false);
  orders: WritableSignal<Order[]> = signal([]);
  constructor() {}

  ngOnInit() {
    this.getUserOrders();
  }

  getUserOrders() {
    this.isLoading.set(true);
    this.orderService
      .getOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Order[]) => {
          this.isLoading.set(false);
          this.orders.set(res);
        },
        error: () => {
          this.isLoading.set(false);
          this.orders.set([]);
        },
      });
  }
}
