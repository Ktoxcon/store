import { createContext } from "react";
import type { CartItem } from "../types/order-item";

export type ShoppingCartContextType = {
  clear: () => void;
  cart: Record<string, CartItem>;
  removeItem: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
};

export const ShoppingCartContext = createContext<
  ShoppingCartContextType | undefined
>(undefined);
