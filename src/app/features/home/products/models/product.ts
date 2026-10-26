export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string;
  discountValue: string;
  cover: string;
  gallery: string;
  categoryId: string;
  subCategoryId: string;
  immutable: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  subCategory: SubCategory;
  occasions: Occasion[];
  _count: Count;
}

export interface Category {
  id: string;
  title: string;
}

export interface SubCategory {
  id: string;
  title: string;
}

export interface Occasion {
  id: string;
  productId: string;
  occasionId: string;
  createdAt: string;
  occasion: Occasion2;
}

export interface Occasion2 {
  id: string;
  title: string;
  description: string;
  image?: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Count {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
  orderItems: number;
}
