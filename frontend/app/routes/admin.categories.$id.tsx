import { Flex, Heading } from "@radix-ui/themes";
import { EditCategoryForm } from "@store/components/categories/edit-category-form";
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "@store/lib/actions/categories.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { ProductCategory } from "@store/lib/types/category";
import { redirect } from "react-router";
import type { Route } from "./+types/admin.categories.$id";

export const loader = ProtectedAdminRoute(async (args) => {
  const result = await getCategory(args);
  return result;
});

export const action = ProtectedAdminRoute(async ({ params, request }) => {
  const method = request.method;

  if (method === "PATCH") await updateCategory({ params, request });
  if (method === "DELETE") await deleteCategory({ params, request });

  return redirect(routes.admin.categories);
});

export default function Category({ loaderData }: Route.ComponentProps) {
  const category = loaderData as ProductCategory;

  return (
    <Flex direction="column" gap="6" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Editing Category: {category.name}
      </Heading>
      <EditCategoryForm category={category} />
    </Flex>
  );
}
