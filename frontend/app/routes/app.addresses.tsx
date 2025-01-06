import { Container, Flex, Section } from "@radix-ui/themes";
import { Outlet } from "react-router";

export default function AddressesLayout() {
  return (
    <Flex direction="column" height="100dvh">
      <Section>
        <Container px={{ initial: "2", lg: "0" }}>
          <Outlet />
        </Container>
      </Section>
    </Flex>
  );
}
