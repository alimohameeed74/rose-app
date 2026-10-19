export interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
