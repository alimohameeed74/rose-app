import { Address } from '../../account/models/address.js';
import { Coupon } from '../../cart/models/coupon.js';
import { OrderItem } from './order-item.js';

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  couponId: any;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  stripePaymentIntentId: any;
  stripeCheckoutSessionId: string;
  subtotal: string;
  discount: string;
  shipping: string;
  total: string;
  trackingNumber: any;
  notes: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  coupon: Coupon;
  user: {
    id: string;
    username: string;
    email: string;
  };
  orderItems: OrderItem[];
}

export interface Checkout {
  checkoutUrl: string;
  sessionId: string;
  expiresAt: string;
  reused: boolean;
}
