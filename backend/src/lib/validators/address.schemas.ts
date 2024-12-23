import { z } from "zod";
import { PaginationRequestBody } from "./pagination.schemas";

export const CreateAddressRequestBodySchema = z.object({
  name: z.string().nonempty(),
  recipient: z.string().nonempty(),
  phone: z.string().nonempty(),
  addressLine: z.string().nonempty(),
  secondAddressLine: z.string().optional(),
  department: z.string().nonempty(),
  township: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export const OptionalAddressDataSchema = z.object({
  name: z.string().nonempty().optional(),
  recipient: z.string().nonempty().optional(),
  phone: z.string().nonempty().optional(),
  addressLine: z.string().nonempty().optional(),
  secondAddressLine: z.string().nonempty().optional(),
  department: z.string().nonempty().optional(),
  township: z.string().nonempty().optional(),
});

export const ListAddressesRequestBodySchema = PaginationRequestBody.merge(
  OptionalAddressDataSchema.pick({
    name: true,
    phone: true,
    township: true,
    department: true,
  })
);
