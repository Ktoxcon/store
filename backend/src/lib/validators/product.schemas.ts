import { z } from "zod";
import { ActiveSchema } from "./model.schemas";
import { PaginationRequestBody } from "./pagination.schemas";

export const ProductPriceSchema = z
  .string()
  .refine((priceString) => Number(priceString));

export const ProductQuantitySchema = z
  .string()
  .nonempty()
  .refine((quantityString) => Number(quantityString));

export const CreateProductRequestBodySchema = z.object({
  name: z.string().nonempty(),
  category: z.string().nonempty(),
  description: z.string().nonempty(),
  price: ProductPriceSchema,
  quantity: ProductQuantitySchema,
});

export const OptionalProductDataSchema = z.object({
  name: z.string().nonempty().optional(),
  category: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  price: ProductPriceSchema.optional(),
  quantity: ProductQuantitySchema.optional(),
  active: ActiveSchema.optional(),
});

export const ListProductsRequestBodySchema = PaginationRequestBody.merge(
  OptionalProductDataSchema
);
