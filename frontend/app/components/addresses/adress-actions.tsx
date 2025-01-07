import { Pencil1Icon } from "@radix-ui/react-icons";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { DeleteAddressForm } from "./delete-address-form";

export type AddressActionProps = { id: string };

export function AddressActions({ id }: AddressActionProps) {
  return (
    <Flex gap="2" direction={{ initial: "column", lg: "row" }}>
      <DeleteAddressForm id={id} />
      <Tooltip content="Edit Address">
        <IconButton asChild>
          <AppLink to={routes.customer.address(id)}>
            <Pencil1Icon />
          </AppLink>
        </IconButton>
      </Tooltip>
    </Flex>
  );
}
