import { Flex, Heading, Section } from "@radix-ui/themes";
import { OrdersList } from "@store/components/orders/orders-list";
import { listOrders } from "@store/lib/actions/orders.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import { OrderStatus } from "@store/lib/constants/order-status";
import type { List } from "@store/lib/types/common";
import type { Order } from "@store/lib/types/orders";
import type { Route } from "./+types/admin._index";

export const loader = ProtectedAdminRoute(async ({ request, ...args }) => {
  const query = new URLSearchParams({ status: OrderStatus.PENDING });
  const response = await listOrders({ ...args, query, request });

  return response;
});

export default function AdminHome({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Order>;

  return (
    <Flex direction="column" gap="6">
      <Heading as="h1" size={{ initial: "6", lg: "8" }}>
        Welcome back!
      </Heading>
      <Section>
        <Heading>New Orders</Heading>
        <OrdersList orders={items} />
      </Section>
    </Flex>
  );
}
