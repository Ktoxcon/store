import { z } from "zod";
import { PaginationRequestBody } from "./pagination.schemas";
import { TransformRawOrderItemsToArray } from "./transformers/order-items.transformer";

export const CreateOrderRequestBodySchema = z.object({
  userId: z.string().nonempty(),
  addressId: z.string().nonempty(),
  status: z.string().optional(),
  deliveryStatus: z.string().optional(),
  items: z.string().transform(TransformRawOrderItemsToArray),
});

export const UpdateOrderRequestBodySchema = CreateOrderRequestBodySchema.omit({
  items: true,
}).partial();

export const ListOrdersRequestBodySchema = PaginationRequestBody.merge(
  UpdateOrderRequestBodySchema
);
