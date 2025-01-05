import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { ProductCategory } from "@store/lib/types/category";
import { EditCategoryFormSchema } from "@store/lib/validators/category.schemas";
import { useForm } from "react-hook-form";
import { Form, useNavigation } from "react-router";
import { StatusSelector } from "../common/status-selector";
import { AppLink } from "../ui/app-link";

export type EditCategoryFormProps = { category: ProductCategory };

export function EditCategoryForm({ category }: EditCategoryFormProps) {
  const navigation = useNavigation();
  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(EditCategoryFormSchema),
  });

  return (
    <Form method="PATCH" action={routes.admin.category(category.id)}>
      <Flex direction="column" gap="6">
        <Box>
          <label htmlFor="name">
            <Text as="div" size="2" mb="1" weight="bold">
              New Category Name
            </Text>
          </label>
          <TextField.Root
            id="name"
            placeholder="Category Name"
            defaultValue={category.name}
            {...register("name")}
          />
        </Box>
        <Flex direction="column">
          <label htmlFor="name">
            <Text as="div" size="2" mb="1" weight="bold">
              New Category Status
            </Text>
          </label>
          <StatusSelector
            control={control}
            defaultValue={String(category.active)}
            {...register("active")}
          />
        </Flex>
      </Flex>
      <Flex gap="3" mt="8" justify="end">
        <Button type="button" color="red" asChild>
          <AppLink underline="none" to={routes.admin.categories}>
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
    </Form>
  );
}
