import type { BadgeProps } from "@radix-ui/themes";

export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED",
};

export const OrderStatusColors: Record<string, BadgeProps["color"]> = {
  PENDING: "yellow",
  CONFIRMED: "green",
  REJECTED: "orange",
  CANCELED: "red",
};
