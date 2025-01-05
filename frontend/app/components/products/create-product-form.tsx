import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { ProductCategory } from "@store/lib/types/category";
import type { List } from "@store/lib/types/common";
import { CreateProductFormSchema } from "@store/lib/validators/product.schemas";
import { useForm } from "react-hook-form";
import { Form, useNavigation, useRouteLoaderData } from "react-router";
import { CategoriesSelector } from "../categories/categories-selector";
import { AppLink } from "../ui/app-link";

export function CreateProductForm() {
  const navigation = useNavigation();
  const categories = useRouteLoaderData<List<ProductCategory>>(
    "routes/admin.products"
  );

  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateProductFormSchema),
  });

  return (
    <Form method="POST" encType="multipart/form-data">
      <Flex
        gap="3"
        direction="column"
        // maxWidth={{ initial: "100%", lg: "50%" }}
      >
        <Box>
          <label htmlFor="category">
            <Text as="div" size="2" mb="1" weight="bold">
              Category
            </Text>
          </label>
          <CategoriesSelector
            control={control}
            categories={categories?.items}
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
        </Box>
        <Flex gap="3" mt="4" justify="end">
          <Button type="button" variant="soft" color="gray">
            <AppLink to={routes.admin.products}>Cancel</AppLink>
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
