import { z } from "zod";

export const CreateUserRequestBodySchema = z.object({
  name: z.string().nonempty(),
});

export const ListUsersRequestBodySchema = z.object({
  filters: z.object({}),
  limit: z.number().nonnegative().default(10),
  offset: z.number().nonnegative().default(1),
});
