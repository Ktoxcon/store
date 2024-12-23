import { z } from "zod";

export const IdParamSchema = z.string().nonempty();

export const ActiveSchema = z
  .string()
  .nonempty()
  .transform((activeString) => {
    const active = activeString === "true" ? true : false;
    return active;
  });
