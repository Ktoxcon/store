import { z } from "zod";
import { StatusSchema } from "./model.schemas";
import { PaginationRequestBody } from "./pagination.schemas";
import { TransformRawOrderItemsToArray } from "./transformers/order-items.transformer";

export const CreateOrderRequestBodySchema = z.object({
  userId: z.string().nonempty(),
  addressId: z.string().nonempty(),
  cancelled: StatusSchema.optional(),
  confirmed: StatusSchema.optional(),
  deliveryStatus: z.string().optional(),
  items: z.string().transform(TransformRawOrderItemsToArray),
});

export const UpdateOrderRequestBodySchema =
  CreateOrderRequestBodySchema.partial();

export const ListOrdersRequestBodySchema = PaginationRequestBody.merge(
  UpdateOrderRequestBodySchema
);
