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

export const EditAddressRequestBodySchema =
  CreateAddressRequestBodySchema.partial();

export const ListAddressesRequestBodySchema = PaginationRequestBody.merge(
  EditAddressRequestBodySchema.pick({
    name: true,
    phone: true,
    township: true,
    department: true,
  })
);
