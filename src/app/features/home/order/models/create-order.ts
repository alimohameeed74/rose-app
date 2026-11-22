export interface CreateOrder {
  addressId: string;
  paymentMethod: string;
  couponCode: string;
  notes: string;
  successUrl: string;
}
