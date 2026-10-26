import { Subcategory } from './subcategory.js';

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: Subcategory[];
  _count: Count;
}

export interface Count {
  products: number;
}
