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

export type DeleteProductFormProps = {
  id: string;
};

export function DeleteProductForm({ id }: DeleteProductFormProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton variant="ghost">
          <Tooltip content="Delete Product">
            <TrashIcon />
          </Tooltip>
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Product</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove this product? Once it's moved to the
          trash bin, it will no longer be accessible to users. However, you can
          restore it later from the trash bin if needed.
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
            <Form method="DELETE" action={routes.admin.product(id)}>
              <Button color="red" variant="solid" style={{ width: "100%" }}>
                Delete
              </Button>
            </Form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
