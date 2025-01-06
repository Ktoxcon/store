import { Grid, type GridProps } from "@radix-ui/themes";
import type { Address } from "@store/lib/types/address";
import { AddressListItem } from "./addresses-list-item";

export type AddressesListProps = {
  addresses: Address[];
} & GridProps;

export function AddressessList({
  addresses,
  ...restProps
}: AddressesListProps) {
  if (!addresses?.length) return;

  return (
    <Grid {...restProps} gap="2" columns={{ initial: "1", lg: "3" }}>
      {addresses.map((address) => (
        <AddressListItem address={address} />
      ))}
    </Grid>
  );
}
