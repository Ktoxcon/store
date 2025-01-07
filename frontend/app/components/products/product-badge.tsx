import { Badge } from "@radix-ui/themes";

export type ProductBadgeProps = { quantity: number };

export function ProductBadge({ quantity }: ProductBadgeProps) {
  if (quantity > 0) return;

  return (
    <Badge
      color="red"
      variant="solid"
      style={{
        top: "5%",
        right: "5%",
        position: "absolute",
      }}
    >
      Out of Stock
    </Badge>
  );
}
