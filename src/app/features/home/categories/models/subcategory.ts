export interface Subcategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  categoryId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}
