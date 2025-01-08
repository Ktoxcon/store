import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { AdminNavBar } from "@store/components/admin/admin-nav";
import { isRouteErrorResponse, Outlet } from "react-router";
import type { Route } from "./+types/admin";

export default function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Flex asChild direction="column" height="100dvh">
        <Container py="8" px={{ initial: "2", lg: "0" }}>
          <Outlet />
        </Container>
      </Flex>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    details = error.message;
  }

  return (
    <>
      <AdminNavBar />
      <Flex height="100%" direction="column" align="center" justify="center">
        <Heading as="h1" size="9">
          {message}
        </Heading>
        <Text as="p" size="5">
          {details}
        </Text>
      </Flex>
    </>
  );
}
