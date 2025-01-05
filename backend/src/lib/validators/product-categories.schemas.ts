import { z } from "zod";
import { StatusSchema } from "./model.schemas";
import { PaginationRequestBody } from "./pagination.schemas";

export const CreateCategoryRequestBodySchema = z.object({
  name: z.string().nonempty(),
  active: StatusSchema.optional(),
});

export const EditCategoryRequestBodySchema =
  CreateCategoryRequestBodySchema.partial();

export const ListCategoriesRequestBodySchema = PaginationRequestBody.merge(
  EditCategoryRequestBodySchema
);
