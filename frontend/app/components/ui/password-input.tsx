import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { IconButton, TextField, Tooltip } from "@radix-ui/themes";
import { useState } from "react";

export function PasswordInput(props: TextField.RootProps) {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);

  const handleVisibilityButtonClick = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <TextField.Root {...props} type={isPasswordVisible ? "text" : "password"}>
      <TextField.Slot side="right">
        <Tooltip content="Toggle Password Visibility">
          <IconButton
            type="button"
            variant="ghost"
            onClick={handleVisibilityButtonClick}
          >
            {isPasswordVisible ? (
              <EyeOpenIcon width="18" height="18" />
            ) : (
              <EyeClosedIcon width="18" height="18" />
            )}
          </IconButton>
        </Tooltip>
      </TextField.Slot>
    </TextField.Root>
  );
}
