import type { ProductCategory } from "./category";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  active: boolean;
  picture: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  ProductCategory: ProductCategory;
};
