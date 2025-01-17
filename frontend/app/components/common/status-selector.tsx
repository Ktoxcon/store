import { Select } from "@radix-ui/themes";
import { Controller, type Control } from "react-hook-form";

export type StatusSelectorProps = {
  name: string;
  control: Control;
  defaultValue?: string;
};

export function StatusSelector({
  name,
  control,
  defaultValue = "",
}: StatusSelectorProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select.Root
          name={field.name}
          value={field.value}
          defaultValue={defaultValue}
          onValueChange={field.onChange}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="true">Active</Select.Item>
              <Select.Item value="false">Inactive</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    />
  );
}
