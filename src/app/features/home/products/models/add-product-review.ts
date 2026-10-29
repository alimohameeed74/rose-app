export interface AddProductReview {
  productId: string;
  headline: string;
  content: string;
  rating: number;
}
export interface UpdateProductReview {
  headline: string;
  rating: number;
}
