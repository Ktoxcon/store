import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { Form } from "react-router";

export type DeleteCategoryFormProps = {
  id: string;
};

export function DeleteCategoryForm({ id }: DeleteCategoryFormProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton variant="ghost">
          <Tooltip content="Delete Category">
            <TrashIcon />
          </Tooltip>
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Category</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove this category? Once it's moved to the
          trash bin, it will no longer be accessible to users, and all
          associated products will also be removed. However, you can restore it
          later from the trash bin if needed.
        </AlertDialog.Description>
        <Flex
          py="4"
          gap="3"
          justify={{ initial: "center", lg: "end" }}
          direction={{ initial: "column-reverse", lg: "row" }}
        >
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Form method="DELETE" action={routes.admin.category(id)}>
              <Button variant="solid  " color="red" style={{ width: "100%" }}>
                Delete
              </Button>
            </Form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
