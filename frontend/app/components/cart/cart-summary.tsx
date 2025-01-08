import { Flex, type FlexProps } from "@radix-ui/themes";
import type { CartItem } from "@store/lib/types/order-item";
import { CartItemCard } from "./cart-item";

export type CartSummaryProps = {
  products: CartItem[];
  actions?: boolean;
} & FlexProps;

export function CartSummary({
  products,
  actions = true,
  ...restProps
}: CartSummaryProps) {
  return (
    <Flex {...restProps} direction="column" gap="1">
      {products.map((item) => (
        <CartItemCard actions={actions} key={item.productId} item={item} />
      ))}
    </Flex>
  );
}
