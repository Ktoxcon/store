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
  name: z.string().optional(),
  recipient: z.string().optional(),
  phone: z.string().optional(),
  addressLine: z.string().optional(),
  secondAddressLine: z.string().optional(),
  department: z.string().optional(),
  township: z.string().optional(),
});

export const ListAddressesRequestBodySchema = PaginationRequestBody.merge(
  OptionalAddressDataSchema.pick({
    name: true,
    phone: true,
    township: true,
    department: true,
  })
);
