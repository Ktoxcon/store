import { Select } from "@radix-ui/themes";
import type { ProductCategory } from "@store/lib/types/category";
import { Controller, type Control } from "react-hook-form";

export type CategoriesSelectorProps = {
  name: string;
  control: Control;
  defaultValue?: string;
  categories?: ProductCategory[] | null;
};

export function CategoriesSelector({
  name,
  control,
  categories,
  defaultValue,
}: CategoriesSelectorProps) {
  if (!categories) return;

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
            <Select.Trigger
              style={{ width: "100%" }}
              placeholder="Product category"
            />
            <Select.Content>
              <Select.Group>
                {categories?.length > 0 &&
                  categories?.map((category) => {
                    return (
                      <Select.Item
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </Select.Item>
                    );
                  })}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        );
      }}
    />
  );
}
