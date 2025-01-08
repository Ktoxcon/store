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

export type InactiveUserFormProps = {
  id: string;
};

export function InactiveUserForm({ id }: InactiveUserFormProps) {
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
        <AlertDialog.Title>
          Are you sure you want to change this user's status to inactive?
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          Once confirmed, the user will no longer have access, and their account
          functionality will be restricted.
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
            <Form method="PATCH" action={routes.admin.user(id)}>
              <Button color="red" variant="solid" style={{ width: "100%" }}>
                Change Status
              </Button>
            </Form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
