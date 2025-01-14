import { Box, Flex, Heading } from "@radix-ui/themes";
import { CategoriesList } from "@store/components/categories/categories-list";
import { CreateCategoryForm } from "@store/components/categories/create-category-form";
import {
  createCategory,
  listCategories,
} from "@store/lib/actions/categories.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import type { ProductCategory } from "@store/lib/types/category";
import type { List } from "@store/lib/types/common";
import type { Route } from "./+types/admin.categories._index";

export const loader = ProtectedAdminRoute(async ({ request }) => {
  const result = await listCategories(request);
  return result;
});

export const action = ProtectedAdminRoute(async ({ request }) => {
  const result = await createCategory(request);
  return result;
});

export default function Categories({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<ProductCategory>;

  return (
    <Flex direction="column" gap="6">
      <Flex
        gap="2"
        align={{ initial: "start", lg: "center" }}
        direction={{ initial: "column", lg: "row" }}
      >
        <Box flexGrow="1">
          <Heading as="h1" size={{ initial: "7", lg: "8" }}>
            Product Categories
          </Heading>
        </Box>
        <Box width={{ initial: "100%", lg: "unset" }}>
          <CreateCategoryForm />
        </Box>
      </Flex>
      <CategoriesList categories={items} />
    </Flex>
  );
}
