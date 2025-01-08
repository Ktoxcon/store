import { Table, Text } from "@radix-ui/themes";

export function OrdersListHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Delivery Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          <Text truncate>Creation Date</Text>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          <Text truncate>Last Update Date</Text>
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
