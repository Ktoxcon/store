import { z } from "zod";
import { StatusSchema } from "./common.schemas";

export const CreateCategoryFormSchema = z.object({
  active: StatusSchema.optional(),
  name: z.string().nonempty({ message: "Category name is required." }),
});

export const EditCategoryFormSchema = CreateCategoryFormSchema.partial();
