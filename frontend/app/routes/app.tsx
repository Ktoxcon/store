import { Flex, Heading, Text } from "@radix-ui/themes";
import { StoreFooter } from "@store/components/common/store-footer";
import { CustomerNavBar } from "@store/components/customer/customer-nav";
import { isRouteErrorResponse, Outlet } from "react-router";
import type { Route } from "./+types/app";

export default function AppLayout() {
  return (
    <>
      <CustomerNavBar />
      <Outlet />
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
      <CustomerNavBar />
      <Flex height="100%" direction="column" align="center" justify="center">
        <Heading as="h1" size="9">
          {message}
        </Heading>
        <Text as="p" size="5">
          {details}
        </Text>
      </Flex>
      <StoreFooter />
    </>
  );
}
