import { Box, Card, Container, Flex } from "@radix-ui/themes";
import { NavBar } from "@store/components/ui/navbar";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <NavBar>
        <NavBar.Left />
      </NavBar>
      <Container size="1" align="center">
        <Flex
          direction="column"
          justify="center"
          height="inherit"
          px={{ initial: "3", lg: "0" }}
        >
          <Card>
            <Box p="5">
              <Flex gap="3" direction="column">
                <Outlet />
              </Flex>
            </Box>
          </Card>
        </Flex>
      </Container>
    </>
  );
}
