import { Container, Heading, Section } from "@radix-ui/themes";
import { CartSummary } from "@store/components/cart/cart-summary";
import { PlaceOrderForm } from "@store/components/orders/place-order-form";
import { listAddresses } from "@store/lib/actions/addresses.actions";
import { createOrder } from "@store/lib/actions/orders.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import type { Address } from "@store/lib/types/address";
import type { List } from "@store/lib/types/common";
import type { Route } from "./+types/app.checkout._index";

export const loader = ProtectedCustomerRoute(async ({ request }) => {
  const response = await listAddresses(request);
  return response;
});

export const action = ProtectedCustomerRoute(async ({ request }) => {
  const response = await createOrder(request);
  return response;
});

export default function Checkout({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Address>;

  return (
    <Container px={{ initial: "2", lg: "0" }} py="6">
      <PlaceOrderForm addresses={items} />
      <Section>
        <Heading>Products</Heading>
        <CartSummary />
      </Section>
    </Container>
  );
}
