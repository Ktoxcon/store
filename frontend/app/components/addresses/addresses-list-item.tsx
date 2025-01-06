import { Pencil1Icon } from "@radix-ui/react-icons";
import { Card, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { Address } from "@store/lib/types/address";
import { AppLink } from "../ui/app-link";
import { DeleteAddressForm } from "./delete-address-form";

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
        <Flex gap="2" direction={{ initial: "column", lg: "row" }}>
          <DeleteAddressForm id={address.id} />
          <Tooltip content="Edit Address">
            <IconButton asChild>
              <AppLink to={routes.customer.address(address.id)}>
                <Pencil1Icon />
              </AppLink>
            </IconButton>
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  );
}
