import { Flex, RadioCards, Text } from "@radix-ui/themes";
import type { Address } from "@store/lib/types/address";

export type AddressListItemProps = {
  address: Address;
};

export function AddressOption({ address }: AddressListItemProps) {
  return (
    <RadioCards.Item value={address.id}>
      <Flex justify="between" width="100%">
        <Flex direction="column" asChild width="100%">
          <address>
            <Text truncate weight="bold">
              {address.name}
            </Text>
            <Text truncate>{address.phone}</Text>
            <Text truncate style={{ maxWidth: "200px" }}>
              {address.addressLine}
            </Text>
          </address>
        </Flex>
      </Flex>
    </RadioCards.Item>
  );
}
