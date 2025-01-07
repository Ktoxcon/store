import { z } from "zod";
import { PriceSchema, QuantitySchema, StatusSchema } from "./model.schemas";
import { PaginationRequestBody } from "./pagination.schemas";

export const CreateProductRequestBodySchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: PriceSchema,
  quantity: QuantitySchema,
  categoryId: z.string().nonempty(),
  active: StatusSchema.optional(),
});

export const EditProductDataSchema = CreateProductRequestBodySchema.partial();

export const ListProductsRequestBodySchema = PaginationRequestBody.merge(
  EditProductDataSchema
);
