import { Box, Flex, Heading } from "@radix-ui/themes";
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
        <Box flexGrow="1">
          <Heading as="h3">About Us</Heading>
        </Box>
        <Box flexGrow="1">
          <Heading as="h3">Help</Heading>
        </Box>
        <Box flexGrow="1">
          <Heading as="h3">Contact</Heading>
        </Box>
        <Box flexGrow="1">
          <Heading as="h3">
            <StoreLogo />
          </Heading>
        </Box>
      </footer>
    </Flex>
  );
}
