import { Product } from '../../products/models/product.js';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  createdAt: string;
  product: Product;
}
