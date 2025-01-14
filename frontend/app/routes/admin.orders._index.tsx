import { Flex, Heading } from "@radix-ui/themes";
import { OrdersList } from "@store/components/orders/orders-list";
import { listOrders } from "@store/lib/actions/orders.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import type { List } from "@store/lib/types/common";
import type { Order } from "@store/lib/types/orders";
import type { Route } from "./+types/admin.categories._index";

export const loader = ProtectedAdminRoute(async ({ request, ...args }) => {
  const result = await listOrders({ ...args, request });
  return result;
});

export default function Orders({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Order>;

  return (
    <Flex gap="6" direction="column">
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Orders
      </Heading>
      <OrdersList orders={items} />
    </Flex>
  );
}
