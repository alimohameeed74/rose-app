export interface Review {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: User_;
  product: Product_;
}

export interface User_ {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface Product_ {
  id: string;
  title: string;
}
