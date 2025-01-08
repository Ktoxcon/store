import { CopyIcon } from "@radix-ui/react-icons";
import { Badge, Code, DataList, Flex, IconButton } from "@radix-ui/themes";
import type { User } from "@store/lib/types/user";

export type UserSummaryProps = { user: User };

export function UserSummary({ user }: UserSummaryProps) {
  return (
    <DataList.Root>
      <DataList.Item>
        <DataList.Label>ID</DataList.Label>
        <DataList.Value>
          <Flex align="center" gap="2">
            <Code variant="ghost">{user.id}</Code>
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
          <Badge>{user.status}</Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Name</DataList.Label>
        <DataList.Value>{user.name}</DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Last Name</DataList.Label>
        <DataList.Value>{user.lastName}</DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>{user.email}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
