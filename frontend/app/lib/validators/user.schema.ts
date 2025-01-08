import { z } from "zod";

export const CreateUserFormSchema = z.object({
  userRole: z.string().nonempty({ message: "User role is required" }),
  name: z.string().nonempty({ message: "Name should not be empty." }),
  lastName: z.string().nonempty({ message: "Last name should not be empty." }),
  email: z.string().nonempty({ message: "Email should not be empty." }).email(),
  status: z.string().optional(),
});

export const EditUserFormSchema = CreateUserFormSchema.partial();
