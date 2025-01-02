import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().nonempty({ message: "Email should not be empty." }).email(),
  password: z
    .string()
    .nonempty({ message: "Password should not be empty." })
    .min(8, "Password should be at least 8 characters."),
});

export const SignUpFormSchema = SignInFormSchema.extend({
  name: z.string().nonempty({ message: "Name should not be empty." }),
  lastName: z.string().nonempty({ message: "Last name should not be empty." }),
  email: z.string().nonempty({ message: "Email should not be empty." }).email(),
  confirmation: z
    .string()
    .nonempty({ message: "Password confirmation should not be empty." })
    .min(8, "Password confirmation should be at least 8 characters."),
}).superRefine(({ confirmation, password }, ctx) => {
  if (confirmation !== password) {
    ctx.addIssue({
      path: ["password"],
      code: z.ZodIssueCode.custom,
      message: "Password & confirmation should match",
    });
  }
});
