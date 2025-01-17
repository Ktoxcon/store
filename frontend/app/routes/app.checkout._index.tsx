import { Flex, Heading, Section } from "@radix-ui/themes";
import { CartSummary } from "@store/components/cart/cart-summary";
import { CheckoutSummary } from "@store/components/cart/checkout-summary";
import { PlaceOrderForm } from "@store/components/orders/place-order-form";
import { listCustomerAddresses } from "@store/lib/actions/addresses.actions";
import { createOrder } from "@store/lib/actions/orders.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import { useToast } from "@store/lib/hooks/use-toast";
import type { ActionResult } from "@store/lib/types/actions";
import type { Address } from "@store/lib/types/address";
import type { List } from "@store/lib/types/common";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/app.checkout._index";

export const loader = ProtectedCustomerRoute(async (args) => {
  const result = await listCustomerAddresses(args);
  return result;
});

export const action = ProtectedCustomerRoute(async (args) => {
  const result = await createOrder(args);
  return result;
});

export default function Checkout({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const data = actionData as ActionResult;
  const { items } = loaderData as List<Address>;

  const toast = useToast();
  const navigate = useNavigate();
  const cart = useShoppingCart();

  const products = Object.values(cart.items);

  useEffect(() => {
    if (data?.success) {
      cart.clear();
      navigate(routes.customer.orders);
    }

    if (!data?.success && data?.error) {
      toast.show({ title: "Checkout Error", description: data?.error });
    }
  }, [data]);

  return (
    <>
      <PlaceOrderForm addresses={items} />
      <Section asChild>
        <Flex direction="column" gap="4">
          <Heading>Summary</Heading>
          <CheckoutSummary />
        </Flex>
      </Section>
      <Section asChild>
        <Flex direction="column" gap="4">
          <Heading>Products</Heading>
          <CartSummary products={products} maxWidth={{ lg: "50%" }} />
        </Flex>
      </Section>
    </>
  );
}
