import type { Product } from "./product";

export type CartItem = {
  name: string;
  price: number;
  picture: string;
  quantity: number;
  productId: string;
};

export type OrderItem = { orderId: string; Product: Product } & CartItem;
