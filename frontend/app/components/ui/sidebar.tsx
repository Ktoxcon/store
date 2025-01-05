import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Dialog, Flex, IconButton, type FlexProps } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { StoreLogo } from "../common/store-logo";

export type SideBarProps = { children?: ReactNode };

function Header() {
  return (
    <Flex justify="between">
      <Dialog.Title>
        <StoreLogo />
      </Dialog.Title>
      <Dialog.Close>
        <IconButton variant="ghost" size="4">
          <Cross1Icon />
        </IconButton>
      </Dialog.Close>
    </Flex>
  );
}

function Item({ children, ...restProps }: SideBarProps & FlexProps) {
  return (
    <Flex {...restProps} align="center" gap="4" py="4">
      {children}
    </Flex>
  );
}

export function SideBar({
  children,
  ...restProps
}: { children?: ReactNode } & Dialog.RootProps) {
  return (
    <Dialog.Root {...restProps}>
      <Dialog.Trigger>
        <IconButton variant="ghost">
          <HamburgerMenuIcon width="40" height="40" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Description hidden>Store Sidebar Menu</Dialog.Description>
      <Dialog.Content
        height="100%"
        width={{ initial: "100%", lg: "25%" }}
        style={{ position: "fixed", top: 0, left: 0, borderRadius: "unset" }}
      >
        <Flex direction="column">
          <SideBar.Header />
          {children}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

SideBar.Item = Item;
SideBar.Header = Header;
