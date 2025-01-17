import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { ProductsList } from "@store/components/products/products-list";
import { AppLink } from "@store/components/ui/app-link";
import { listProducts } from "@store/lib/actions/products.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { List } from "@store/lib/types/common";
import type { Product } from "@store/lib/types/product";
import type { Route } from "./+types/admin.categories._index";

export const loader = ProtectedAdminRoute(async (args) => {
  const result = await listProducts(args);
  return result;
});

export default function Products({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Product>;

  return (
    <Flex gap="6" direction="column">
      <Flex
        gap="2"
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Box flexGrow="1">
          <Heading as="h1" size={{ initial: "7", lg: "8" }}>
            Products
          </Heading>
        </Box>
        <Box width={{ initial: "100%", lg: "unset" }}>
          <Button asChild style={{ width: "100%" }}>
            <AppLink underline="none" to={routes.admin.newProduct}>
              Create Product
            </AppLink>
          </Button>
        </Box>
      </Flex>
      <ProductsList products={items} />
    </Flex>
  );
}
