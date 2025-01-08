import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { AppLink } from "@store/components/ui/app-link";
import { UsersList } from "@store/components/users/users-list";
import { listUsers } from "@store/lib/actions/users.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { List } from "@store/lib/types/common";
import type { User } from "@store/lib/types/user";
import type { Route } from "./+types/admin.categories._index";

export const loader = ProtectedAdminRoute(async ({ request, ...args }) => {
  const response = await listUsers({ ...args, request });
  return response;
});

export default function Users({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<User>;

  return (
    <Flex gap="6" direction="column">
      <Flex
        gap="2"
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Box flexGrow="1">
          <Heading as="h1" size={{ initial: "7", lg: "8" }}>
            Users
          </Heading>
        </Box>
        <Box width={{ initial: "100%", lg: "unset" }}>
          <Button asChild style={{ width: "100%" }}>
            <AppLink underline="none" to={routes.admin.newUser}>
              Create User
            </AppLink>
          </Button>
        </Box>
      </Flex>
      <UsersList users={items} />
    </Flex>
  );
}
