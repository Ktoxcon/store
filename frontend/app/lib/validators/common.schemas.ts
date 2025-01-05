import { z } from "zod";

export const StatusSchema = z
  .string()
  .nonempty()
  .transform((statusString) => {
    const status = statusString === "true" ? true : false;
    return status;
  });
