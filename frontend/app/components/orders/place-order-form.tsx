import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Heading, Section } from "@radix-ui/themes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import type { Address } from "@store/lib/types/address";
import type { User } from "@store/lib/types/user";
import { CreateOrderFormSchema } from "@store/lib/validators/order.schemas";
import { useForm } from "react-hook-form";
import { Form, useNavigation, useRouteLoaderData } from "react-router";
import { AddressessSelector } from "../addresses/addresses-selector";

export type PlaceOrderFormProps = { addresses: Address[] };

export function PlaceOrderForm({ addresses }: PlaceOrderFormProps) {
  const cart = useShoppingCart();
  const navigation = useNavigation();
  const user = useRouteLoaderData<User>("root");

  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateOrderFormSchema),
  });

  return (
    <Section>
      <Form method="POST">
        <input id="user" name="userId" type="hidden" value={user?.id} />
        <input type="hidden" name="items" value={JSON.stringify(cart.items)} />
        <Flex
          gap="2"
          align={{ initial: "start", lg: "center" }}
          direction={{ initial: "column", lg: "row" }}
        >
          <Box flexGrow="1">
            <Heading as="h1" size={{ initial: "7", lg: "8" }}>
              Review Your Order
            </Heading>
          </Box>
          <Box width={{ initial: "100%", lg: "unset" }}>
            <Button
              style={{ width: "100%" }}
              loading={navigation.state === "submitting"}
              disabled={!formState.isDirty || !formState.isValid}
            >
              Place Order
            </Button>
          </Box>
        </Flex>

        <Section>
          <Heading>Select an address</Heading>
          <Box maxWidth={{ initial: "100%", lg: "50%" }}>
            <AddressessSelector
              control={control}
              addresses={addresses}
              {...register("addressId")}
            />
          </Box>
        </Section>
      </Form>
    </Section>
  );
}
