import { Select } from "@radix-ui/themes";
import { themePropDefs, type ThemeOwnProps } from "@radix-ui/themes/props";
import { useTheme } from "@store/lib/hooks/use-theme-context";

export function ColorSelector() {
  const { color, setColor } = useTheme();

  const handleValueChange = (color: string) => {
    setColor(color as ThemeOwnProps["accentColor"]);
  };

  return (
    <Select.Root defaultValue={color} onValueChange={handleValueChange}>
      <Select.Trigger
        color={color}
        variant="soft"
        placeholder="App Color"
        style={{ width: "100%" }}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>App Colors</Select.Label>
          {themePropDefs.accentColor.values.map((color) => (
            <Select.Item key={`color-${color}`} value={color}>
              {color}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
