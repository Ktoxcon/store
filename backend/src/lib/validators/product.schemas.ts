import { z } from "zod";
import { StatusSchema } from "./model.schemas";
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
  description: z.string().nonempty(),
  price: ProductPriceSchema,
  quantity: ProductQuantitySchema,
  categoryId: z.string().nonempty(),
  active: StatusSchema.optional(),
});

export const EditProductDataSchema = CreateProductRequestBodySchema.partial();

export const ListProductsRequestBodySchema = PaginationRequestBody.merge(
  EditProductDataSchema
);
