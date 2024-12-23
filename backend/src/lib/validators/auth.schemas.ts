import { z } from "zod";

export const SignInRequestBodySchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8),
});

export const SignUpRequestBodySchema = SignInRequestBodySchema.extend({
  name: z.string().nonempty(),
  phone: z.string().optional(),
  lastName: z.string().nonempty(),
});
