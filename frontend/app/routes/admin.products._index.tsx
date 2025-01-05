import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { ProductsList } from "@store/components/products/products-list";
import { AppLink } from "@store/components/ui/app-link";
import { createCategory } from "@store/lib/actions/categories.actions";
import { listProducts } from "@store/lib/actions/products.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { List } from "@store/lib/types/common";
import type { Product } from "@store/lib/types/product";
import type { Route } from "./+types/admin.categories._index";

export const loader = ProtectedAdminRoute(async ({ request }) => {
  const response = await listProducts(request);
  return response;
});

export const action = ProtectedAdminRoute(async ({ request }) => {
  const response = await createCategory(request);
  return response;
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
        <Flex flexGrow="1">
          <Heading as="h1" size={{ initial: "7", lg: "8" }}>
            Products
          </Heading>
        </Flex>
        <Box flexGrow={{ initial: "1", lg: "0" }}>
          <Button asChild>
            <AppLink to={routes.admin.newProduct}>Create Product</AppLink>
          </Button>
        </Box>
      </Flex>
      <ProductsList products={items} />
    </Flex>
  );
}
