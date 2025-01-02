import { Link, type LinkProps as RadixLinkProps } from "@radix-ui/themes";
import type { ReactNode } from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";

export type AppLinkProps = RouterLinkProps &
  RadixLinkProps & { children: ReactNode };

export function AppLink({ children, ...props }: AppLinkProps) {
  return (
    <Link asChild {...props}>
      <RouterLink {...props}>{children}</RouterLink>
    </Link>
  );
}
