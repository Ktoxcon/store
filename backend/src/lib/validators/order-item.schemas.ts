import { z } from "zod";

export const OrderItemQuantitySchema = z
  .string()
  .nonempty()
  .transform((quantityString) => {
    const quantity = Number(quantityString);

    return Number.isNaN(quantity) ? 0 : quantity;
  });

export const CreateOrderItemRequestBodySchema = z.object({
  orderId: z.string().nonempty(),
  productId: z.string().nonempty(),
  quantity: OrderItemQuantitySchema,
});

export const UpdateOrderItemRequestBodySchema = z.object({
  quantity: OrderItemQuantitySchema,
});

export const ListOrderItemsRequestBodySchema = z.object({
  orderId: z.string().nonempty(),
});
