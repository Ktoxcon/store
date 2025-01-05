import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { ProductCategory } from "@store/lib/types/category";
import type { List } from "@store/lib/types/common";
import type { Product } from "@store/lib/types/product";
import { EditProductFormSchema } from "@store/lib/validators/product.schemas";
import { useForm } from "react-hook-form";
import { Form, useNavigation, useRouteLoaderData } from "react-router";
import { CategoriesSelector } from "../categories/categories-selector";
import { AppLink } from "../ui/app-link";

export type EditProductFormProps = { product: Product };

export function EditProductForm({ product }: EditProductFormProps) {
  const navigation = useNavigation();
  const categories = useRouteLoaderData<List<ProductCategory>>(
    "routes/admin.products"
  );
  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(EditProductFormSchema),
  });

  return (
    <Form method="PATCH" action={routes.admin.product(product.id)}>
      <Flex gap="3" direction="column">
        <Box>
          <label htmlFor="category">
            <Text as="div" size="2" mb="1" weight="bold">
              Category
            </Text>
          </label>
          <CategoriesSelector
            control={control}
            categories={categories?.items}
            defaultValue={product.categoryId.toString()}
            {...register("categoryId")}
          />
        </Box>
        <Box>
          <label htmlFor="name">
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
          </label>
          <TextField.Root
            id="name"
            defaultValue={product.name}
            placeholder="Enter product name"
            {...register("name")}
          />
        </Box>
        <Box>
          <label htmlFor="price">
            <Text as="div" size="2" mb="1" weight="bold">
              Price
            </Text>
          </label>
          <TextField.Root
            id="price"
            type="number"
            defaultValue={product.price}
            placeholder="Enter product price"
            {...register("price")}
          />
        </Box>
        <Box>
          <label htmlFor="description">
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
          </label>
          <TextArea
            id="description"
            defaultValue={product.description}
            placeholder="Enter product description"
            {...register("description")}
          />
        </Box>
        <Box>
          <label htmlFor="stock">
            <Text as="div" size="2" mb="1" weight="bold">
              Stock
            </Text>
          </label>
          <TextField.Root
            id="stock"
            type="number"
            defaultValue={product.quantity}
            placeholder="Enter product stock"
            {...register("quantity", { min: 1 })}
          />
        </Box>
        <Box>
          <label htmlFor="picture">
            <Text as="div" size="2" mb="1" weight="bold">
              Image
            </Text>
          </label>
          <div className="rt-TextFieldRoot rt-r-size-2 rt-variant-surface">
            <input
              type="file"
              id="picture"
              placeholder="Select a product image"
              className="rt-reset rt-TextFieldInput"
              {...register("picture")}
            />
          </div>
          <Box maxWidth="200px" maxHeight="200px">
            {product.picture && (
              <img
                src={product.picture}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            )}
          </Box>
        </Box>
        <Flex
          py="8"
          gap="3"
          justify={{ initial: "center", lg: "end" }}
          direction={{ initial: "column-reverse", lg: "row" }}
        >
          <Button type="button" color="red" variant="outline" asChild>
            <AppLink underline="none" to={routes.admin.products}>
              Cancel
            </AppLink>
          </Button>

          <Button
            type="submit"
            loading={navigation.state === "submitting"}
            disabled={
              !formState.isDirty ||
              !formState.isValid ||
              navigation.state === "submitting"
            }
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
