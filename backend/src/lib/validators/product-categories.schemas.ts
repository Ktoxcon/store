import { z } from "zod";
import { ActiveSchema } from "./model.schemas";
import { PaginationRequestBody } from "./pagination.schemas";

export const CreateCategoryRequestBodySchema = z.object({
  name: z.string().nonempty(),
});

export const OptionalCategoryDataSchema = z.object({
  active: ActiveSchema.optional(),
  name: z.string().nonempty().optional(),
});

export const ListCategoriesRequestBodySchema = PaginationRequestBody.merge(
  OptionalCategoryDataSchema
);
