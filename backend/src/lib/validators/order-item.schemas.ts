import { z } from "zod";

export const OrderItemSchema = z.object({
  price: z.number(),
  quantity: z.number(),
  productId: z.number(),
  orderId: z.number().optional(),
});

export const ListOrderItemsRequestBody = OrderItemSchema.partial();

export const OrderItemsSchema = z.array(OrderItemSchema);
