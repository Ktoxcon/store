import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Flex, Heading } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { StoreLogo } from "./store-logo";

export function StoreFooter() {
  return (
    <Flex
      px="6"
      py="8"
      gap="8"
      asChild
      justify="between"
      direction={{
        lg: "row",
        initial: "column",
      }}
      style={{
        boxShadow: "var(--shadow-2)",
        background: "var(--accent-9)",
        color: "var(--accent-contrast)",
      }}
    >
      <footer>
        <Flex direction="column" flexGrow="1" gap="4">
          <Heading as="h3">About Us</Heading>
          <AppLink to={routes.about} style={{ color: "inherit" }}>
            Who are we?
          </AppLink>
          <AppLink to={routes.about} style={{ color: "inherit" }}>
            Careers
          </AppLink>
          <AppLink to={routes.about} style={{ color: "inherit" }}>
            Terms & Conditions
          </AppLink>
          <AppLink to={routes.about} style={{ color: "inherit" }}>
            Privacy Policies
          </AppLink>
        </Flex>
        <Flex direction="column" flexGrow="1" gap="4">
          <Heading as="h3">Help</Heading>
          <AppLink style={{ color: "inherit" }} to={routes.customer.profile}>
            Your Account
          </AppLink>
          <AppLink style={{ color: "inherit" }} to={routes.customer.orders}>
            Orders
          </AppLink>
        </Flex>
        <Flex direction="column" flexGrow="1" gap="4">
          <Heading as="h3">Contact</Heading>
          <AppLink
            target="_blank"
            style={{ color: "inherit" }}
            to="https://github.com/Ktoxcon/store/tree/main"
          >
            <GitHubLogoIcon /> Github
          </AppLink>
        </Flex>
        <Flex direction="column" flexGrow="1" gap="4">
          <Heading as="h3">
            <StoreLogo />
          </Heading>
        </Flex>
      </footer>
    </Flex>
  );
}
