import { z } from "zod";

export const IdParamSchema = z.string().nonempty();

export const StatusSchema = z
  .string()
  .nonempty()
  .transform((statusString) => {
    const status = statusString === "true" ? true : false;
    return status;
  });
