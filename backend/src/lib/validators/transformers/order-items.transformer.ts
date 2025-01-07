import { OrderItems } from "../order-item.schemas";

export function TransformRawOrderItemsToArray(items: string) {
  const parsed = Object.values(JSON.parse(items));
  const validated = OrderItems.parse(parsed);

  return validated;
}