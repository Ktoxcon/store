import { Flex, Heading, Text } from "@radix-ui/themes";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/root";
import { NavBar } from "./components/ui/navbar";
import { profileCookie } from "./lib/auth/session-cookie";
import { Providers } from "./lib/providers";

import "@radix-ui/themes/styles.css";
import "./app.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const headers = request.headers;
  const profile = await profileCookie.getSession(headers.get("Cookie"));

  return profile.data;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <Flex height="100dvh" width="100dwh" direction="column">
            {children}
          </Flex>
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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
      <NavBar>
        <NavBar.Left />
      </NavBar>
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
