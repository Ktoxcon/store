import { Button, Container, Flex, IconButton, Popover } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import { ShoppingCartIcon } from "../icons/cart";
import { AppLink } from "../ui/app-link";
import { CartBadge } from "./cart-badge";
import { CartSummary } from "./cart-summary";
import { ClearShoppingCart } from "./clear-cart";

export function ShoppingCart() {
  const cart = useShoppingCart();
  const products = Object.values(cart.items);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton size="3" radius="full" style={{ position: "relative" }}>
          <CartBadge items={products} />
          <ShoppingCartIcon width="20px" height="20px" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content asChild>
        <Flex direction="column" width={{ initial: "300px", lg: "360px" }}>
          {products.length > 0 ? (
            <CartSummary
              height="180px"
              overflowY="scroll"
              direction="column"
              products={products}
              style={{ scrollbarWidth: "thin" }}
            />
          ) : (
            <Container>Your cart is empty</Container>
          )}
          <Flex
            pt="3"
            gap="4"
            justify="end"
            direction={{ initial: "column-reverse", lg: "row" }}
          >
            <ClearShoppingCart />
            <Popover.Close>
              <Button asChild size="2" disabled={products.length === 0}>
                <AppLink underline="none" to={routes.customer.checkout}>
                  Proceed to checkout
                </AppLink>
              </Button>
            </Popover.Close>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
