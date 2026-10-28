import { Product } from './product.js';

export interface AddtowishlistResponse {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
}
