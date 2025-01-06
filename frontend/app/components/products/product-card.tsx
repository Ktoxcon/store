import { Box, Button, Card, Flex, Inset, Strong, Text } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { QuetzalCurrencyFormatter } from "@store/lib/fomatters/currency";
import type { Product } from "@store/lib/types/product";
import { AppLink } from "../ui/app-link";

export type ProductCardProps = {
  product: Product;
  size?: "sm" | "lg";
};

export function ProductCard({ product, size = "lg" }: ProductCardProps) {
  const boxWidth = size === "sm" ? "200px" : "100%";
  const cardDirection = size === "sm" ? "column" : "row";
  const imageSide = size === "sm" ? "top" : "left";

  return (
    <Box width={boxWidth} height="100%">
      <Card>
        <Flex direction={cardDirection}>
          <Inset
            side={imageSide}
            clip="padding-box"
            pb={{ initial: "current", lg: "0" }}
          >
            <img
              src={product.picture}
              alt={`${product.name} picture`}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "140px",
              }}
            />
          </Inset>
          <Flex gap="2" direction="column" p="2">
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
              <Button style={{ width: "100%" }}>Add to cart</Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
