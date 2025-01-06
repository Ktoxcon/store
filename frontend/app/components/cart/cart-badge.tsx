import { Badge } from "@radix-ui/themes";
import type { CartItem } from "@store/lib/types/order-item";

export type CartBadgeProps = { items: CartItem[] };

export function CartBadge({ items }: CartBadgeProps) {
  const total = items.reduce((total: number, item: CartItem) => {
    return total + item.quantity;
  }, 0);

  if (!total) return;

  return (
    <Badge
      variant="solid"
      color="red"
      style={{
        top: "-10%",
        left: "60%",
        position: "absolute",
      }}
    >
      {total}
    </Badge>
  );
}
