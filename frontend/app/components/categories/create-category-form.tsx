import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { CreateCategoryFormSchema } from "@store/lib/validators/category.schemas";
import { useForm } from "react-hook-form";
import { Form, useNavigation } from "react-router";

export function CreateCategoryForm() {
  const navigation = useNavigation();
  const { register, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateCategoryFormSchema),
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button style={{ width: "100%" }}>Create Category</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create Product Category</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add a new product category
        </Dialog.Description>

        <Form method="POST" action="/admin/categories">
          <Flex direction="column" gap="3">
            <label htmlFor="name">
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
            </label>
            <TextField.Root
              id="name"
              required
              placeholder="Category Name"
              {...register("name")}
            />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button color="red">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                type="submit"
                loading={navigation.state === "submitting"}
                disabled={!formState.isDirty || !formState.isValid}
              >
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
