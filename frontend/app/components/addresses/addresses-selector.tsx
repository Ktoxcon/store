import { RadioCards } from "@radix-ui/themes";
import type { Address } from "@store/lib/types/address";
import { Controller, type Control } from "react-hook-form";
import { AddressOption } from "./address-option";

export type AddressesListProps = {
  name: string;
  control: Control;
  addresses: Address[];
};

export function AddressessSelector({
  name,
  control,
  addresses,
}: AddressesListProps) {
  if (!addresses?.length) return;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioCards.Root
          gap="2"
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          columns={{ initial: "1", lg: "2" }}
        >
          {addresses.map((address) => (
            <AddressOption key={address.id} address={address} />
          ))}
        </RadioCards.Root>
      )}
    />
  );
}
