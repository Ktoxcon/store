import { ShoppingCartContext } from "../context/shopping-cart.context";
import { useLocalStorage } from "../hooks/use-local-storage";
import type { CartItem } from "../types/order-item";

export function ShoppingCartProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useLocalStorage<Record<string, CartItem>>("cart", {});

  const clear = () => {
    setCart({});
  };

  const addItem = (cartItem: Omit<CartItem, "quantity">) => {
    const item = cart[cartItem.productId];

    if (!item) {
      const updatedCart = {
        ...cart,
        [cartItem.productId]: { ...cartItem, quantity: 1 },
      };

      setCart(updatedCart);
      return;
    }

    const updatedCart = {
      ...cart,
      [cartItem.productId]: { ...cartItem, quantity: item.quantity + 1 },
    };

    setCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const { [id]: _, ...rest } = cart;
    setCart(rest);
  };

  const decreaseItemQuantity = (itemId: string) => {
    const item = cart[itemId];

    if (!item) return;

    if (item.quantity > 1) {
      const updatedCart = {
        ...cart,
        [item.productId]: { ...item, quantity: item.quantity - 1 },
      };

      setCart(updatedCart);
      return;
    }

    removeItem(itemId);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, clear, addItem, removeItem, decreaseItemQuantity }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
