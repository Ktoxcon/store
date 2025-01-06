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

export type DeleteAddressFormProps = {
  id: string;
};

export function DeleteAddressForm({ id }: DeleteAddressFormProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton>
          <Tooltip content="Delete Product">
            <TrashIcon />
          </Tooltip>
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Address</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove this address? Once it's moved to the
          trash bin, it will no longer be accessible.
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
            <Form method="DELETE" action={routes.customer.address(id)}>
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
