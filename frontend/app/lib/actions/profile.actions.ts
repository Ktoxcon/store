import type { LoaderFunctionArgs } from "react-router";
import { profileCookie } from "../auth/session-cookie";

export async function getProfile({ request }: LoaderFunctionArgs) {
  const headers = request.headers;
  const profile = await profileCookie.getSession(headers.get("Cookie"));

  return profile.data;
}
