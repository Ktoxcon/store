import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { CreateUserFormSchema } from "@store/lib/validators/user.schema";
import { useForm } from "react-hook-form";
import { Form, useNavigation } from "react-router";
import { AppLink } from "../ui/app-link";
import { RolesSelector } from "./roles-selector";

export function CreateUserForm() {
  const navigation = useNavigation();

  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateUserFormSchema),
  });

  return (
    <Form method="POST">
      <Flex gap="3" direction="column">
        <Box>
          <label htmlFor="category">
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
          </label>
          <RolesSelector control={control} {...register("userRole")} />
        </Box>
        <Box>
          <label htmlFor="name">
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
          </label>
          <TextField.Root
            id="name"
            placeholder="Enter user name"
            {...register("name")}
          />
        </Box>
        <Box>
          <label htmlFor="lastName">
            <Text as="div" size="2" mb="1" weight="bold">
              Last Name
            </Text>
          </label>
          <TextField.Root
            id="price"
            placeholder="Enter user last name"
            {...register("lastName")}
          />
        </Box>
        <Box>
          <label htmlFor="stock">
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
          </label>
          <TextField.Root
            id="stock"
            type="email"
            placeholder="Enter user email"
            {...register("email")}
          />
        </Box>

        <Flex
          py="8"
          gap="3"
          justify={{ initial: "center", lg: "end" }}
          direction={{ initial: "column-reverse", lg: "row" }}
        >
          <Button type="button" color="red" variant="outline" asChild>
            <AppLink underline="none" to={routes.admin.products}>
              Cancel
            </AppLink>
          </Button>

          <Button
            type="submit"
            loading={navigation.state === "submitting"}
            disabled={
              !formState.isDirty ||
              !formState.isValid ||
              navigation.state === "submitting"
            }
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
