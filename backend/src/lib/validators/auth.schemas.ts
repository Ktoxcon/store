import { z } from "zod";

export const SendRecoveryLinkRequestBodySchema = z.object({
  email: z.string().nonempty().email(),
});

export const SignInRequestBodySchema = SendRecoveryLinkRequestBodySchema.extend(
  {
    password: z.string().nonempty().min(8),
  }
);

export const SignUpRequestBodySchema = SignInRequestBodySchema.extend({
  name: z.string().nonempty(),
  phone: z.string().optional(),
  lastName: z.string().nonempty(),
});

export const ResetPasswordRequestBodySchema = z.object({
  token: z.string().nonempty(),
  password: z.string().nonempty().min(8),
});
