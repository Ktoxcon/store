import { Select } from "@radix-ui/themes";
import { Controller, type Control } from "react-hook-form";

export type UserStatusSelectorProps = {
  name: string;
  control: Control;
  defaultValue?: string;
};

export function UserStatusSelector({
  name,
  control,
  defaultValue = "",
}: UserStatusSelectorProps) {
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
              <Select.Item key="inactive" value="INACTIVE">
                Inactive
              </Select.Item>
              <Select.Item key="active" value="ACTIVE">
                Active
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    />
  );
}
