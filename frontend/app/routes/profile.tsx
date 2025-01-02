import { ProtectedRoute } from "@store/lib/auth/decorators";
import { profileCookie } from "@store/lib/auth/session-cookie";
import type { LoaderFunctionArgs } from "react-router";

export const loader = ProtectedRoute(
  async ({ request }: LoaderFunctionArgs) => {
    const headers = request.headers;
    const profile = await profileCookie.getSession(headers.get("Cookie"));

    return profile.data;
  }
);
