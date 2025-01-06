import { Flex, Heading } from "@radix-ui/themes";
import { CreateAddressForm } from "@store/components/addresses/create-address-form";
import { createAddress } from "@store/lib/actions/addresses.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import { redirect } from "react-router";

export const action = ProtectedCustomerRoute(async ({ request }) => {
  await createAddress(request);
  return redirect(routes.customer.addresses);
});

export default function CreateAddress() {
  return (
    <Flex gap="6" direction="column" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Create New Address
      </Heading>
      <CreateAddressForm />
    </Flex>
  );
}
