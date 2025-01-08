import { CrossCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Tooltip } from "@radix-ui/themes";
import { OrderStatus } from "@store/lib/constants/order-status";
import routes from "@store/lib/constants/routes";
import type { OrderActionProps } from "@store/lib/types/order-action.props";
import { Form } from "react-router";

export function CancelOrderAction({ order, size = "sm" }: OrderActionProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Tooltip content="Cancel Order">
          <Button
            color="red"
            variant={size === "sm" ? "ghost" : "solid"}
            disabled={order.status !== OrderStatus.PENDING}
          >
            <CrossCircledIcon />
            {size === "sm" ? "" : "Cancel Order"}
          </Button>
        </Tooltip>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          Are you sure you want to cancel this order?
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          Once canceled, it will no longer be processed, and you will need to
          create a new order.
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
            <Form method="PATCH" action={routes.customer.order(order.id)}>
              <input type="hidden" name="status" value={OrderStatus.CANCELED} />
              <Button variant="solid" color="red" style={{ width: "100%" }}>
                Confirm Cancellation
              </Button>
            </Form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
