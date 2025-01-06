import { ShoppingCartContext } from "../context/shopping-cart.context";
import { useLocalStorage } from "../hooks/use-local-storage";
import type { CartItem } from "../types/order-item";

export function ShoppingCartProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [items, setItems] = useLocalStorage<Record<string, CartItem>>(
    "cart",
    {}
  );

  const clear = () => {
    setItems({});
  };

  const addItem = (cartItem: Omit<CartItem, "quantity">) => {
    const item = items[cartItem.productId];

    if (!item) {
      const updatedCart = {
        ...items,
        [cartItem.productId]: { ...cartItem, quantity: 1 },
      };

      setItems(updatedCart);
      return;
    }

    const updatedCart = {
      ...items,
      [cartItem.productId]: { ...cartItem, quantity: item.quantity + 1 },
    };

    setItems(updatedCart);
  };

  const removeItem = (id: string) => {
    const { [id]: _, ...rest } = items;
    setItems(rest);
  };

  const decreaseItemQuantity = (itemId: string) => {
    const item = items[itemId];

    if (!item) return;

    if (item.quantity > 1) {
      const updatedCart = {
        ...items,
        [item.productId]: { ...item, quantity: item.quantity - 1 },
      };

      setItems(updatedCart);
      return;
    }

    removeItem(itemId);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ items, clear, addItem, removeItem, decreaseItemQuantity }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
