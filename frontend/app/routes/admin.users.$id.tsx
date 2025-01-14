import { Flex, Heading } from "@radix-ui/themes";
import { EditUserForm } from "@store/components/users/edit-user-form";
import { getUser, updateUser } from "@store/lib/actions/users.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { User } from "@store/lib/types/user";
import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/app.addresses.$id";

export const loader = ProtectedAdminRoute(async (args: LoaderFunctionArgs) => {
  const result = await getUser(args);
  return result;
});

export const action = ProtectedAdminRoute(async (args: ActionFunctionArgs) => {
  await updateUser(args);
  return redirect(routes.admin.users);
});

export default function User({ loaderData }: Route.ComponentProps) {
  const user = loaderData as User;

  return (
    <Flex direction="column" gap="6" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Editing user with ID: {user.id}
      </Heading>

      <EditUserForm user={user} />
    </Flex>
  );
}
