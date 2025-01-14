import { CopyIcon } from "@radix-ui/react-icons";
import { Badge, Code, DataList, Flex, IconButton } from "@radix-ui/themes";
import { QuetzalCurrencyFormatter } from "@store/lib/fomatters/currency";
import type { Order } from "@store/lib/types/orders";
import { OrderStatusBadge } from "./order-status-badge";

export type OrderSummaryProps = { order: Order };

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <DataList.Root>
      <DataList.Item>
        <DataList.Label>ID</DataList.Label>
        <DataList.Value>
          <Flex align="center" gap="2">
            <Code variant="ghost">{order.id}</Code>
            <IconButton
              size="1"
              color="gray"
              variant="ghost"
              aria-label="Copy value"
            >
              <CopyIcon />
            </IconButton>
          </Flex>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Status</DataList.Label>
        <DataList.Value>
          <OrderStatusBadge status={order.status} />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Delivery Status</DataList.Label>
        <DataList.Value>
          <Badge>{order.deliveryStatus}</Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Total</DataList.Label>
        <DataList.Value>
          {QuetzalCurrencyFormatter.format(order.total)}
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
