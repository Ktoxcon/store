import { Flex } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CartItem } from "./cart-item";

export function CartSummary() {
  const cart = useShoppingCart();
  const navigate = useNavigate();

  const products = Object.values(cart.items);

  useEffect(() => {
    if (products.length) return;

    navigate(routes.customer.home);
  }, [cart.items]);

  return (
    <Flex direction="column" gap="1">
      {products.map((item) => (
        <CartItem width={{ lg: "50%" }} key={item.productId} item={item} />
      ))}
    </Flex>
  );
}
