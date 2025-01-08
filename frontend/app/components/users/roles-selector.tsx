import { Select } from "@radix-ui/themes";
import { Controller, type Control } from "react-hook-form";

export type RolesSelectorProps = {
  name: string;
  control: Control;
  defaultValue?: string;
};

export function RolesSelector({
  name,
  control,
  defaultValue,
}: RolesSelectorProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Select.Root
            name={field.name}
            value={field.value}
            defaultValue={defaultValue}
            onValueChange={field.onChange}
          >
            <Select.Trigger style={{ width: "100%" }} placeholder="User role" />
            <Select.Content>
              <Select.Group>
                <Select.Item key="admin" value="admin">
                  Admin
                </Select.Item>
                <Select.Item key="customer" value="customer">
                  Customer
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        );
      }}
    />
  );
}
