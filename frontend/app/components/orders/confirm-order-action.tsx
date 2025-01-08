import { CheckCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Tooltip } from "@radix-ui/themes";
import { OrderStatus } from "@store/lib/constants/order-status";
import routes from "@store/lib/constants/routes";
import type { OrderActionProps } from "@store/lib/types/order-action.props";
import { Form } from "react-router";

export function ConfirmOrderAction({ order, size = "sm" }: OrderActionProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Tooltip content="Confirm Order">
          <Button
            variant={size === "sm" ? "ghost" : "solid"}
            disabled={order.status !== OrderStatus.PENDING}
          >
            <CheckCircledIcon /> {size === "sm" ? "" : "Confirm Order"}
          </Button>
        </Tooltip>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          Are you sure you want to confirm this order?
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          Once confirmed, the order will be processed, and no further changes
          can be made.
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
            <Form method="PATCH" action={routes.admin.order(order.id)}>
              <input
                type="hidden"
                name="status"
                value={OrderStatus.CONFIRMED}
              />
              <Button variant="solid" color="green" style={{ width: "100%" }}>
                Confirm
              </Button>
            </Form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
