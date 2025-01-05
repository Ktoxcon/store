import { Flex, Heading } from "@radix-ui/themes";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";

export const loader = ProtectedAdminRoute();

export default function AdminHome() {
  return (
    <Flex direction="column" gap="6">
      <Flex
        gap="2"
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Heading as="h1" size={{ initial: "6", lg: "8" }}>
          Welcome back!
        </Heading>
      </Flex>
    </Flex>
  );
}
