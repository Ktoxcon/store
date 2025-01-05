import { Flex, type FlexProps } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { StoreHomeLink } from "../common/store-home-link";

export type NavBarProps = { children?: ReactNode };
export type NavBarCenterProps = FlexProps & Partial<NavBarProps>;

function NavBarLeft({ children }: Partial<NavBarProps>) {
  return (
    <Flex gap="2" align="center">
      {children}
      <StoreHomeLink />
    </Flex>
  );
}

function NavBarCenter({ children, ...restProps }: NavBarCenterProps) {
  return (
    <Flex {...restProps} flexGrow="1" align="center">
      {children}
    </Flex>
  );
}

function NavBarRight({ children }: NavBarProps) {
  return <Flex align="center">{children}</Flex>;
}

export function NavBar({ children }: NavBarProps) {
  return (
    <Flex
      asChild
      py="4"
      gap="6"
      align="center"
      px={{ initial: "2", lg: "6" }}
      style={{
        boxShadow: "var(--shadow-2)",
      }}
    >
      <nav>{children}</nav>
    </Flex>
  );
}

NavBar.Left = NavBarLeft;
NavBar.Center = NavBarCenter;
NavBar.Right = NavBarRight;
