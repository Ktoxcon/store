import { Flex, Heading } from "@radix-ui/themes";
import { EditAddressForm } from "@store/components/addresses/edit-address-form";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@store/lib/actions/addresses.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { Address } from "@store/lib/types/address";
import { redirect } from "react-router";
import type { Route } from "./+types/app.addresses.$id";

export const loader = ProtectedCustomerRoute(async ({ params, request }) => {
  const response = await getAddress({ params, request });
  return response;
});

export const action = ProtectedCustomerRoute(async ({ params, request }) => {
  const method = request.method;

  if (method === "PATCH") await updateAddress({ params, request });
  if (method === "DELETE") await deleteAddress({ params, request });

  return redirect(routes.customer.addresses);
});

export default function Category({ loaderData }: Route.ComponentProps) {
  const address = loaderData as Address;

  return (
    <Flex direction="column" gap="6" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Editing Address: {address.name}
      </Heading>
      <EditAddressForm address={address} />
    </Flex>
  );
}
