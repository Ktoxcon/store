import { Heading, Section } from "@radix-ui/themes";
import { CustomerOrdersList } from "@store/components/orders/customer-orders-list";
import { listCustomerOrders } from "@store/lib/actions/orders.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import type { List } from "@store/lib/types/common";
import type { Order } from "@store/lib/types/orders";
import type { Route } from "./+types/app.addresses._index";

export const loader = ProtectedCustomerRoute(async ({ request, ...args }) => {
  const response = await listCustomerOrders({ ...args, request });
  return response;
});

export default function OrdersHome({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Order>;

  return (
    <>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Your Orders
      </Heading>
      <Section>
        <CustomerOrdersList orders={items} />
      </Section>
    </>
  );
}
