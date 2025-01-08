import { Flex, Heading } from "@radix-ui/themes";
import { CreateUserForm } from "@store/components/users/create-user-form";
import { createUser } from "@store/lib/actions/users.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import { redirect } from "react-router";

export const action = ProtectedAdminRoute(async ({ request }) => {
  await createUser(request);
  return redirect(routes.admin.users);
});

export default function CreateUser() {
  return (
    <Flex gap="6" direction="column" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Create New User
      </Heading>
      <CreateUserForm />
    </Flex>
  );
}
