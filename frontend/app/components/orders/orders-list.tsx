import { Container, Table } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { Order } from "@store/lib/types/orders";
import type { ReactNode } from "react";
import { ConfirmOrderAction } from "./confirm-order-action";
import { OrdersListHeader } from "./orders-list-header";
import { OrdersListItem } from "./orders-list-item";
import { RejectOrderAction } from "./reject-order-action";

export type OrdersListProps = {
  children?: ReactNode;
  orders: Order[] | null;
};

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <Table.Root variant="surface">
      <OrdersListHeader />
      <Table.Body>
        {orders && orders?.length > 0 ? (
          orders.map((order) => {
            return (
              <OrdersListItem
                order={order}
                route={routes.admin.order(order.id)}
              >
                <RejectOrderAction order={order} />
                <ConfirmOrderAction order={order} />
              </OrdersListItem>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell>
              <Container size="1">No Orders</Container>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
