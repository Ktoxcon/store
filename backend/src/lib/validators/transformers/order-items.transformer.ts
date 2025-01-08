import { OrderItemsSchema } from "../order-item.schemas";

export function TransformRawOrderItemsToArray(items: string) {
  const parsed = Object.values(JSON.parse(items));
  const validated = OrderItemsSchema.parse(parsed);

  return validated;
}
