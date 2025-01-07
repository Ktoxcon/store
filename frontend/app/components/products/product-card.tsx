import { Box, Button, Card, Flex, Inset, Strong, Text } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { QuetzalCurrencyFormatter } from "@store/lib/fomatters/currency";
import { useShoppingCart } from "@store/lib/hooks/use-shopping-cart";
import type { Product } from "@store/lib/types/product";
import { AppLink } from "../ui/app-link";
import { ProductBadge } from "./product-badge";

export type ProductCardProps = {
  product: Product;
  size?: "sm" | "lg";
};

export function ProductCard({ product, size = "lg" }: ProductCardProps) {
  const imageSide = size === "sm" ? "top" : "left";
  const boxWidth = size === "sm" ? "200px" : "100%";
  const cardDirection = size === "sm" ? "column" : "row";

  const cart = useShoppingCart();

  const handleAddToCartClick = () => {
    const { id, name, price, picture } = product;

    cart.addItem({ name, price, picture, productId: id });
  };

  return (
    <Box width={boxWidth} height="100%" position="relative">
      <Card style={{ position: "relative" }}>
        <Flex direction={cardDirection}>
          <Inset
            side={imageSide}
            clip="padding-box"
            pb={{ initial: "current", lg: "0" }}
            style={{ position: "relative" }}
          >
            <img
              src={product.picture}
              alt={`${product.name} picture`}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "140px",
                filter: product.quantity > 0 ? "unset" : "grayscale(90%)",
              }}
            />
          </Inset>
          <Flex gap="2" direction="column" p="2">
            <ProductBadge quantity={product.quantity} />
            <Flex direction="column">
              <Text truncate>
                <AppLink
                  to={routes.customer.home}
                  style={{ color: "var(--accent-contrast)" }}
                >
                  {product.name}
                </AppLink>
              </Text>

              <Text as="p" size="3">
                <Strong>
                  {QuetzalCurrencyFormatter.format(product.price)}
                </Strong>
              </Text>
            </Flex>
            <Flex justify="end" width="100%">
              <Button
                style={{ width: "100%" }}
                onClick={handleAddToCartClick}
                disabled={product.quantity === 0}
              >
                Add to cart
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
