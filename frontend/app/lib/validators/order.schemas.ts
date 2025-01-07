import { z } from "zod";

export const CreateOrderFormSchema = z.object({
  addressId: z.number(),
});
