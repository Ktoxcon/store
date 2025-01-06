import { Flex, Grid, type FlexProps, type GridProps } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { StoreHomeLink } from "../common/store-home-link";

export type NavBarProps = { children?: ReactNode };
export type NavBarCenterProps = FlexProps & Partial<NavBarProps>;

function NavBarLeft({
  children,
  ...restProps
}: Partial<NavBarProps> & FlexProps) {
  return (
    <Flex
      {...restProps}
      gap="2"
      align="center"
      flexGrow={{ initial: "1" }}
      gridRow={{ initial: "1", lg: "1" }}
    >
      {children}
      <StoreHomeLink />
    </Flex>
  );
}

function NavBarCenter({ children, ...restProps }: NavBarCenterProps) {
  return (
    <Flex {...restProps} flexGrow="1" gridRow={{ initial: "2", lg: "1" }}>
      {children}
    </Flex>
  );
}

function NavBarRight({ children, ...restProps }: NavBarProps & FlexProps) {
  return (
    <Flex
      {...restProps}
      align="center"
      flexShrink={{ initial: "0" }}
      gridRow={{ initial: "1", lg: "1" }}
    >
      {children}
    </Flex>
  );
}

export function NavBar({ children, ...restProps }: NavBarProps & GridProps) {
  return (
    <Grid
      {...restProps}
      py="4"
      asChild
      align="center"
      px={{ initial: "4", lg: "6" }}
      style={{
        boxShadow: "var(--shadow-2)",
      }}
    >
      <nav>{children}</nav>
    </Grid>
  );
}

NavBar.Left = NavBarLeft;
NavBar.Center = NavBarCenter;
NavBar.Right = NavBarRight;
