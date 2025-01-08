import { Badge, Flex, Table, Text } from "@radix-ui/themes";
import { QuetzalCurrencyFormatter } from "@store/lib/fomatters/currency";
import type { Order } from "@store/lib/types/orders";
import type { ReactNode } from "react";
import { AppLink } from "../ui/app-link";
import { OrderStatusBadge } from "./order-status-badge";

export type OrdersListItemProps = {
  order: Order;
  route: string;
  children?: ReactNode;
};

export function OrdersListItem({
  order,
  route,
  children,
}: OrdersListItemProps) {
  return (
    <Table.Row key={order.id}>
      <Table.RowHeaderCell>
        <AppLink to={route}>{order.id}</AppLink>
      </Table.RowHeaderCell>
      <Table.Cell>
        <OrderStatusBadge status={order.status} />
      </Table.Cell>
      <Table.Cell>
        <Badge>{order.deliveryStatus}</Badge>
      </Table.Cell>
      <Table.Cell>{QuetzalCurrencyFormatter.format(order.total)}</Table.Cell>
      <Table.Cell>
        <Text truncate>{new Date(order.createdAt).toLocaleString()}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text truncate>{new Date(order.updatedAt).toLocaleString()}</Text>
      </Table.Cell>
      <Table.Cell>
        <Flex gap="2">{children}</Flex>
      </Table.Cell>
    </Table.Row>
  );
}
