import { z } from "zod";

export const CreateAddressFormSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
  recipient: z.string().nonempty(),
  addressLine: z.string().nonempty(),
  secondAddressLine: z.string().optional(),
  department: z.string().nonempty(),
  township: z.string().nonempty(),
});

export const EditAddressFormSchema = CreateAddressFormSchema.optional();
