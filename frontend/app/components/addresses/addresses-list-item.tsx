import { Card, Flex, Text } from "@radix-ui/themes";
import type { Address } from "@store/lib/types/address";
import { AddressActions } from "./adress-actions";

export type AddressListItemProps = {
  address: Address;
};

export function AddressListItem({ address }: AddressListItemProps) {
  return (
    <Card>
      <Flex>
        <Flex direction="column" asChild width="100%">
          <address>
            <Text truncate weight="bold">
              {address.name}
            </Text>
            <Text truncate style={{ maxWidth: "200px" }}>
              {address.phone}
            </Text>
            <Text truncate style={{ maxWidth: "200px" }}>
              {address.addressLine}
            </Text>
          </address>
        </Flex>
        <AddressActions id={address.id} />
      </Flex>
    </Card>
  );
}
