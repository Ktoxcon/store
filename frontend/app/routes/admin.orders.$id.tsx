import { Box, Flex, Heading } from "@radix-ui/themes";
import { ConfirmOrderAction } from "@store/components/orders/confirm-order-action";
import { OrderDetails } from "@store/components/orders/order-details";
import { RejectOrderAction } from "@store/components/orders/reject-order-action";
import { getOrder, updateOrder } from "@store/lib/actions/orders.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { Order } from "@store/lib/types/orders";
import { redirect } from "react-router";
import type { Route } from "./+types/app.orders.$id";

export const loader = ProtectedAdminRoute(async (args) => {
  const result = await getOrder(args);
  return result;
});

export const action = ProtectedAdminRoute(async (args) => {
  await updateOrder(args);
  return redirect(routes.admin.orders);
});

export default function Category({ loaderData }: Route.ComponentProps) {
  const order = loaderData as Order;

  return (
    <>
      <Flex
        gap="2"
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Box flexGrow="1">
          <Heading as="h1" size={{ initial: "7", lg: "8" }}>
            Order Details
          </Heading>
        </Box>
        <Flex gap="2" width={{ initial: "100%", lg: "unset" }}>
          <RejectOrderAction size="lg" order={order} />
          <ConfirmOrderAction size="lg" order={order} />
        </Flex>
      </Flex>
      <OrderDetails order={order} />
    </>
  );
}
