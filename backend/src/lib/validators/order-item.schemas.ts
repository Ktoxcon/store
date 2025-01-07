import { z } from "zod";

export const OrderItem = z.object({
  price: z.number(),
  quantity: z.number(),
  productId: z.number(),
  orderId: z.number().optional(),
});

export const OrderItems = z.array(OrderItem);
