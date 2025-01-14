import { Container, Table } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { CancelOrderAction } from "./cancel-order-action";
import type { OrdersListProps } from "./orders-list";
import { OrdersListHeader } from "./orders-list-header";
import { OrdersListItem } from "./orders-list-item";

export function CustomerOrdersList({ orders }: OrdersListProps) {
  return (
    <Table.Root variant="surface">
      <OrdersListHeader />
      <Table.Body>
        {orders && orders?.length > 0 ? (
          orders.map((order) => {
            return (
              <OrdersListItem
                key={order.id}
                order={order}
                route={routes.customer.order(order.id)}
              >
                <CancelOrderAction order={order} />
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
