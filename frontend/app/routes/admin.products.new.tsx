import { Flex, Heading } from "@radix-ui/themes";
import { CreateProductForm } from "@store/components/products/create-product-form";
import { createProduct } from "@store/lib/actions/products.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import { redirect } from "react-router";

export const action = ProtectedAdminRoute(async ({ request }) => {
  await createProduct(request);
  return redirect(routes.admin.products);
});

export default function CreateProduct() {
  return (
    <Flex gap="6" direction="column" maxWidth={{ initial: "100%", lg: "50%" }}>
      <Heading as="h1" size={{ initial: "7", lg: "8" }}>
        Create New Product
      </Heading>
      <CreateProductForm />
    </Flex>
  );
}
