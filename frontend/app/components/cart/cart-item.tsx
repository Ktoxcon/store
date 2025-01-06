import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  IconButton,
  Inset,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import type { CartItem } from "@store/lib/types/order-item";

export type CartItemProps = { item: CartItem };

export function CartItem({ item }: CartItemProps) {
  const { addItem, removeItem, decreaseItemQuantity } = useShoppingCart();

  return (
    <Box>
      <Card>
        <Flex gap="2">
          <Inset side="left" clip="padding-box">
            <img
              src={item.picture}
              alt={`${item.name} picture`}
              style={{
                width: "80px",
                height: "120px",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Inset>

          <Flex justify="between" direction="column" width="150px">
            <Text truncate>{item.name}</Text>
            <Text>
              <Strong>x{item.quantity}</Strong>
            </Text>
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
          </Flex>

          <Flex justify="end" flexGrow="1">
            <IconButton size="1" onClick={() => removeItem(item.productId)}>
              <Cross1Icon />
            </IconButton>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
