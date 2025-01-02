import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useFormState, type Control } from "react-hook-form";

export type SignUpFormErrorsProps = {
  control: Control;
};

export function SignUpFormErrors({ control }: SignUpFormErrorsProps) {
  const formState = useFormState({ control });

  return (
    formState.isDirty &&
    !formState.isValid &&
    Object.keys(formState.errors).length > 0 && (
      <Callout.Root color="red">
        <Callout.Icon style={{ alignSelf: "center" }}>
          <InfoCircledIcon />
        </Callout.Icon>
        <ul style={{ paddingInlineStart: 20, margin: 0 }}>
          {Object.keys(formState.errors).map((key) => {
            const message = formState.errors[key]?.message as string;
            return (
              <li key={key} style={{ outline: "1px solid balck" }}>
                <Callout.Text>{message}</Callout.Text>
              </li>
            );
          })}
        </ul>
      </Callout.Root>
    )
  );
}
