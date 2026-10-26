import { Product } from '../../products/models/product.js';
import { Category, Count } from './category.js';

export interface SubcategoryDetails {
  id: string;
  title: string;
  description: string;
  image: any;
  categoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  products: Product[];
  _count: Count;
}
