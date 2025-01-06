import { Badge } from "@radix-ui/themes";

export type CartBadgeProps = { total: number };

export function CartBadge({ total }: CartBadgeProps) {
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
