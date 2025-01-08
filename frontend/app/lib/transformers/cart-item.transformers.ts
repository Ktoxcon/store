import type { OrderItem } from "../types/order-item";

export function fromOrderItemsToCartItems(orderItems: OrderItem[]) {
  const products = orderItems.map((orderItem) => {
    const { Product } = orderItem;

    return { ...orderItem, ...Product };
  });

  return products;
}
