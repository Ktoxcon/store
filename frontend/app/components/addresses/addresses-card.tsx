import { Card, Flex, Text } from "@radix-ui/themes";
import type { Address } from "@store/lib/types/address";
import { AddressActions } from "./adress-actions";

export type AddressCardProps = {
  address: Address;
  actions?: boolean;
  concise?: boolean;
};

export function AddressCard({
  address,
  actions = true,
  concise = true,
}: AddressCardProps) {
  return (
    <Card>
      <Flex>
        <Flex direction="column" asChild width="100%">
          <address>
            <Text truncate weight="bold">
              {address.name}
            </Text>
            {!concise && <Text truncate>{address.recipient}</Text>}
            <Text truncate style={{ maxWidth: "200px" }}>
              {address.phone}
            </Text>
            <Text truncate style={{ maxWidth: "200px" }}>
              {address.addressLine}
            </Text>
            {!concise && (
              <Text truncate style={{ maxWidth: "200px" }}>
                {address.department}
              </Text>
            )}
            {!concise && (
              <Text truncate style={{ maxWidth: "200px" }}>
                {address.township}
              </Text>
            )}
          </address>
        </Flex>
        {actions && <AddressActions id={address.id} />}
      </Flex>
    </Card>
  );
}
