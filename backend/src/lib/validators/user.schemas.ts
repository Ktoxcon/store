import { z } from "zod";
import { PaginationRequestBody } from "./pagination.schemas";

export const CreateUserRequestBodySchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  userRole: z.string().nonempty(),
  lastName: z.string().nonempty(),
  status: z.string().optional(),
});

export const EditUserSchema = CreateUserRequestBodySchema.partial();

export const ListUsersRequestBodySchema = PaginationRequestBody.merge(
  EditUserSchema.partial()
);
