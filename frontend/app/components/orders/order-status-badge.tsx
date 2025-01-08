import { Badge } from "@radix-ui/themes";
import { OrderStatusColors } from "@store/lib/constants/order-status";

export type OrderStatusBadgeProps = { status: string };

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const color = OrderStatusColors[status];

  return <Badge color={color}>{status}</Badge>;
}
