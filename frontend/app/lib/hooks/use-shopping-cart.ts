import { useContext } from "react";
import { ShoppingCartContext } from "../context/shopping-cart.context";

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useShoppingCart can't be used outside a Shopping Cart Context Provider"
    );
  }

  return context;
}
