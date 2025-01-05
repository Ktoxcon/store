import { PersonIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Link,
  Popover,
  Separator,
  Text,
  type FlexProps,
} from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { User } from "@store/lib/types/user";
import { type ReactNode } from "react";
import { Link as AppLink, useRouteLoaderData } from "react-router";
import { ColorSelector } from "../theme/color-selector";
import { ThemeSwitch } from "../theme/theme-switch";

export type AccountProps = { children: ReactNode };
export type AccountSectionProps = {
  title?: string;

  separator?: boolean;
} & AccountProps &
  FlexProps;

function AccountSection({
  title,
  children,
  separator = true,
  ...restProps
}: AccountSectionProps) {
  return (
    <>
      <Flex {...restProps} direction="column" gap="2">
        {title && (
          <Text as="p" size="2">
            {title}
          </Text>
        )}
        {children}
      </Flex>
      {separator && <Separator size="4" />}
    </>
  );
}

export function Account({ children }: AccountProps) {
  const user = useRouteLoaderData<User>("root");

  const picture = user?.picture ? user.picture : "";
  const username = user?.name ? (
    `${user.name.charAt(0)}${user.lastName.charAt(0)}`
  ) : (
    <PersonIcon />
  );

  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton radius="full">
          <Avatar
            variant="solid"
            radius="full"
            src={picture}
            fallback={username}
          />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content width="230px">
        <Flex gap="3" direction="column">
          <Flex flexGrow="1" direction="column" align="center" gap="2">
            <Box>
              <Text as="p" size="2">
                Hi {user?.name} {user?.lastName}&#x21;
              </Text>
            </Box>
            <Separator size="4" />
          </Flex>
          {children}
          <Account.Section title="Theme">
            <Flex justify="between" align="center" gap="2">
              <ThemeSwitch />
              <Box flexGrow="1">
                <ColorSelector />
              </Box>
            </Flex>
          </Account.Section>
          <Account.Section separator={false} align="center">
            <Link asChild size="1">
              <AppLink to={routes.auth.signout}>Sign Out</AppLink>
            </Link>
          </Account.Section>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

Account.Section = AccountSection;
