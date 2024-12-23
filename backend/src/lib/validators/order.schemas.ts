import { z } from "zod";
import { StatusSchema } from "./model.schemas";
import { PaginationRequestBody } from "./pagination.schemas";

export const CreateOrderRequestBodySchema = z.object({
  userId: z.string().nonempty(),
  addressId: z.string().nonempty(),
});

export const OptionalOrderDataSchema = z.object({
  userId: z.string().optional(),
  addressId: z.string().optional(),
  cancelled: StatusSchema.optional(),
  confirmed: StatusSchema.optional(),
});

export const UpdateOrderRequestBodySchema = OptionalOrderDataSchema.pick({
  addressId: true,
});

export const ConfirmOrderRequestBodySchema = z.object({
  confirmed: StatusSchema,
});

export const ListOrdersRequestBodySchema = PaginationRequestBody.merge(
  OptionalOrderDataSchema
);
