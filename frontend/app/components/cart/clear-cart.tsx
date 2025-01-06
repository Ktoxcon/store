import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";

export function ClearShoppingCart() {
  const cart = useShoppingCart();
  const products = Object.values(cart.items);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="soft" color="red" disabled={products.length === 0}>
          Clear Cart
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Clear Cart</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to clear your shopping cart this product? Once
          it's cleared it will no longer be accessible.
        </AlertDialog.Description>
        <Flex
          py="4"
          gap="3"
          justify={{ initial: "center", lg: "end" }}
          direction="column"
        >
          <AlertDialog.Action>
            <Button
              color="red"
              variant="solid"
              onClick={() => cart.clear()}
              style={{ width: "100%" }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
