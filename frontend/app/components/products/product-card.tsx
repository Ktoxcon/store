import { Box, Card, Inset, Text } from "@radix-ui/themes";
import type { Product } from "@store/lib/types/product";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Box maxWidth="240px" maxHeight="240px" flexShrink="0">
      <Card>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={product.picture}
            alt={`${product.name} picture`}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: "140px",
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Box>
          <Text>{product.name}</Text>
          <Text as="p" size="3">
            {product.description}
          </Text>
        </Box>
      </Card>
    </Box>
  );
}
