import { z } from "zod";
import { PasswordConfirmationRefinement } from "../refinements/password";

export const PasswordSchema = z
  .string()
  .nonempty({ message: "Password should not be empty." })
  .min(8, "Password should be at least 8 characters.");

export const PasswordRecoveryFormSchema = z.object({
  email: z.string().email().nonempty({ message: "Email should not be empty." }),
});

export const SignInFormSchema = PasswordRecoveryFormSchema.extend({
  password: PasswordSchema,
});

export const ResetPasswordFormSchema = z
  .object({
    password: PasswordSchema,
    confirmation: z
      .string()
      .nonempty({ message: "Password confirmation should not be empty." })
      .min(8, "Password confirmation should be at least 8 characters."),
  })
  .superRefine(PasswordConfirmationRefinement);

export const SignUpFormSchema = SignInFormSchema.extend({
  name: z.string().nonempty({ message: "Name should not be empty." }),
  lastName: z.string().nonempty({ message: "Last name should not be empty." }),
  email: z.string().nonempty({ message: "Email should not be empty." }).email(),
})
  .merge(ResetPasswordFormSchema.innerType())
  .superRefine(PasswordConfirmationRefinement);
