import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  Grid,
  IconButton,
  Inset,
  Strong,
  Text,
  type BoxProps,
} from "@radix-ui/themes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import type { CartItem } from "@store/lib/types/order-item";

export type CartItemCardProps = {
  item: CartItem;
  actions?: boolean;
} & BoxProps;

export function CartItemCard({
  item,
  actions = true,
  ...restProps
}: CartItemCardProps) {
  const { addItem, removeItem, decreaseItemQuantity } = useShoppingCart();

  return (
    <Box {...restProps}>
      <Card>
        <Grid columns="20% 70% 10%">
          <Inset side="left" clip="padding-box">
            <Box width="100%" height="100%">
              <img
                src={item.picture}
                alt={`${item.name} picture`}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Inset>
          <Flex p="4" gap="2" justify="between" direction="column">
            <Text as="p" truncate>
              {item.name}
            </Text>
            <Text>
              <Strong>x{item.quantity}</Strong>
            </Text>
            {actions && (
              <Flex gap="2">
                <IconButton
                  size="1"
                  onClick={() => decreaseItemQuantity(item.productId)}
                >
                  <MinusIcon />
                </IconButton>
                <IconButton size="1" onClick={() => addItem(item)}>
                  <PlusIcon />
                </IconButton>
              </Flex>
            )}
          </Flex>

          {actions && (
            <Flex justify="center">
              <IconButton size="1" onClick={() => removeItem(item.productId)}>
                <Cross1Icon />
              </IconButton>
            </Flex>
          )}
        </Grid>
      </Card>
    </Box>
  );
}
