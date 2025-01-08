import { Badge, Container, Flex, Table, Text } from "@radix-ui/themes";
import type { User } from "@store/lib/types/user";
import { InactiveUserForm } from "./inactive-user-form";

export type UsersListProps = {
  users: User[] | null;
};

export function UsersList({ users }: UsersListProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Text wrap="pretty">Name</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text truncate>Creation Date</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text truncate>Last Update Date</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users && users?.length > 0 ? (
          users.map((user) => {
            return (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  <Text truncate>{user.name}</Text>
                </Table.RowHeaderCell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>
                  <Text truncate>{user.email}</Text>
                </Table.Cell>
                <Table.Cell>{user.userRole}</Table.Cell>
                <Table.Cell>
                  <Badge>{user.status}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text truncate>
                    {new Date(user.createdAt).toLocaleString()}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text truncate>
                    {new Date(user.updatedAt).toLocaleString()}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Flex align="center" gap="4">
                    <InactiveUserForm id={user.id} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell>
              <Container size="1">No Users</Container>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
