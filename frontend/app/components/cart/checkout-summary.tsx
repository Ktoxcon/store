import { DataList, Text } from "@radix-ui/themes";
import { QuetzalCurrencyFormatter } from "@store/lib/fomatters/currency";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import type { CartItem } from "@store/lib/types/order-item";

export function CheckoutSummary() {
  const cart = useShoppingCart();
  const products = Object.values(cart.items);

  const total = products.reduce((total: number, product: CartItem) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <DataList.Root>
      {products.map((product) => (
        <DataList.Item key={product.productId}>
          <DataList.Label>
            {`${product.quantity} ${product.name}`}
          </DataList.Label>
          <DataList.Value>
            {QuetzalCurrencyFormatter.format(product.price)}
          </DataList.Value>
        </DataList.Item>
      ))}
      <DataList.Item>
        <DataList.Label>
          <Text weight="bold">Total</Text>
        </DataList.Label>
        <DataList.Value>
          <Text weight="bold">{QuetzalCurrencyFormatter.format(total)}</Text>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
