import {
  redirect,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "react-router";
import { UserRoles } from "../constants/roles";
import routes from "../constants/routes";
import { profileCookie } from "./session-cookie";

export function ProtectedRoute(
  loaderOrAction?: LoaderFunction | ActionFunction
) {
  return async function ({
    request,
    context,
    ...restArgs
  }: LoaderFunctionArgs | ActionFunctionArgs) {
    const profile = await profileCookie.getSession(
      request.headers.get("Cookie")
    );

    if (!profile.get("id")) {
      return redirect(routes.auth.signin);
    }

    if (!loaderOrAction) return null;

    //@ts-expect-error Error due to this not having a specific type
    return await loaderOrAction.call(this, {
      request,
      context,
      ...restArgs,
    });
  };
}

export function ProtectedAdminRoute(
  loaderOrAction?: LoaderFunction | ActionFunction
) {
  return async function ({
    request,
    context,
    ...restArgs
  }: LoaderFunctionArgs | ActionFunctionArgs) {
    const profile = await profileCookie.getSession(
      request.headers.get("Cookie")
    );

    if (!profile.get("id")) {
      return redirect(routes.auth.signin);
    }

    if (profile.get("userRole") !== UserRoles.ADMIN) {
      return redirect(routes.customer.home);
    }

    if (!loaderOrAction) return null;

    //@ts-expect-error Error due to 'this' not having a specific type
    return await loaderOrAction.call(this, {
      request,
      context,
      ...restArgs,
    });
  };
}

export function ProtectedCustomerRoute(
  loaderOrAction?: LoaderFunction | ActionFunction
) {
  return async function ({
    request,
    context,
    ...restArgs
  }: LoaderFunctionArgs | ActionFunctionArgs) {
    const profile = await profileCookie.getSession(
      request.headers.get("Cookie")
    );

    if (!profile.get("id")) {
      return redirect(routes.auth.signin);
    }

    if (profile.get("userRole") !== UserRoles.CUSTOMER) {
      return redirect(routes.admin.home);
    }

    if (!loaderOrAction) return null;

    //@ts-expect-error Error due to 'this' not having a specific type
    return await loaderOrAction.call(this, {
      request,
      context,
      ...restArgs,
    });
  };
}
