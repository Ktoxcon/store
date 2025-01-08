import { Box, Flex, Heading, Section } from "@radix-ui/themes";
import { CancelOrderAction } from "@store/components/orders/cancel-order-action";
import { OrderDetails } from "@store/components/orders/order-details";
import { getOrder, updateOrder } from "@store/lib/actions/orders.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { Order } from "@store/lib/types/orders";
import { redirect } from "react-router";
import type { Route } from "./+types/app.orders.$id";

export const loader = ProtectedCustomerRoute(async ({ params, request }) => {
  const response = await getOrder({ params, request });
  return response;
});

export const action = ProtectedCustomerRoute(async ({ params, request }) => {
  await updateOrder({ params, request });
  return redirect(routes.customer.orders);
});

export default function Category({ loaderData }: Route.ComponentProps) {
  const order = loaderData as Order;

  return (
    <>
      <Flex
        gap="2"
        asChild
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Section py="0">
          <Box flexGrow="1">
            <Heading as="h1" size={{ initial: "7", lg: "8" }}>
              Order Details
            </Heading>
          </Box>
          <Box width={{ initial: "100%", lg: "unset" }}>
            <CancelOrderAction size="lg" order={order} />
          </Box>
        </Section>
      </Flex>
      <OrderDetails order={order} />
    </>
  );
}
