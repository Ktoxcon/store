import { Box, Button, Flex, Heading, Section } from "@radix-ui/themes";
import { AddressessList } from "@store/components/addresses/addresses-list";
import { AppLink } from "@store/components/ui/app-link";
import { listCustomerAddresses } from "@store/lib/actions/addresses.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { Address } from "@store/lib/types/address";
import type { List } from "@store/lib/types/common";
import type { Route } from "./+types/app.addresses._index";

export const loader = ProtectedCustomerRoute(async (args) => {
  const result = await listCustomerAddresses(args);
  return result;
});

export default function AddressesHome({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Address>;

  return (
    <>
      <Flex
        gap="2"
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Box flexGrow="1">
          <Heading as="h1" size={{ initial: "7", lg: "8" }}>
            Your Addresses
          </Heading>
        </Box>
        <Box width={{ initial: "100%", lg: "unset" }}>
          <Button asChild style={{ width: "100%" }}>
            <AppLink underline="none" to={routes.customer.newAddress}>
              Create Address
            </AppLink>
          </Button>
        </Box>
      </Flex>
      <Section>
        <AddressessList addresses={items} />
      </Section>
    </>
  );
}
