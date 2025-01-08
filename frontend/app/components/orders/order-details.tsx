import { Flex, Heading, Section } from "@radix-ui/themes";
import { fromOrderItemsToCartItems } from "@store/lib/transformers/cart-item.transformers";
import type { Order } from "@store/lib/types/orders";
import { AddressCard } from "../addresses/addresses-card";
import { CartSummary } from "../cart/cart-summary";
import { OrderSummary } from "./order-summary";

export type OrderDetailsProps = { order: Order };

export function OrderDetails({ order }: OrderDetailsProps) {
  const products = fromOrderItemsToCartItems(order.OrderItems);

  return (
    <Flex direction="column" width={{ initial: "100%", lg: "50%" }}>
      <Flex gap="6" asChild direction="column">
        <Section>
          <Heading>Summary</Heading>
          <OrderSummary order={order} />
        </Section>
      </Flex>
      <Section py="0">
        <Heading>Delivery Address</Heading>
        <AddressCard actions={false} concise={false} address={order.Address} />
      </Section>
      <Section>
        <Heading>Products</Heading>
        <CartSummary actions={false} products={products} />
      </Section>
    </Flex>
  );
}
