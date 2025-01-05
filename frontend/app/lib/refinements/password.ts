import { z } from "zod";

export type PasswordConfirmationRefinementArgs = {
  password: string;
  confirmation: string;
};

export function PasswordConfirmationRefinement(
  { confirmation, password }: PasswordConfirmationRefinementArgs,
  ctx: z.RefinementCtx
) {
  if (confirmation !== password) {
    ctx.addIssue({
      path: ["password"],
      code: z.ZodIssueCode.custom,
      message: "Password & confirmation should match",
    });
  }
}
