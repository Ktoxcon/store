import { Flex, Heading } from "@radix-ui/themes";
import { EditProductForm } from "@store/components/products/edit-product-form";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "@store/lib/actions/products.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { Product } from "@store/lib/types/product";
import { redirect } from "react-router";
import type { Route } from "./+types/admin.categories.$id";

export const loader = ProtectedAdminRoute(async (args) => {
  const result = await getProduct(args);
  return result;
});

export const action = ProtectedAdminRoute(async ({ params, request }) => {
  const method = request.method;

  if (method === "PATCH") await updateProduct({ params, request });
  if (method === "DELETE") await deleteProduct({ params, request });

  return redirect(routes.admin.products);
});

export default function Product({ loaderData }: Route.ComponentProps) {
  const product = loaderData as Product;

  return (
    <Flex gap="6" direction="column" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Editing Product: {product.name}
      </Heading>
      <EditProductForm product={product} />
    </Flex>
  );
}
