import routes from "@store/lib/constants/routes";
import { redirect, type ActionFunctionArgs } from "react-router";
import { profileCookie } from "../auth/session-cookie";
import { UserRoles } from "../constants/roles";
import { fromFormDataToObject } from "../http/form-data";

export async function signUp(request: ActionFunctionArgs["request"]) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch("http://localhost:3300/auth/signup", {
    body,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();

  if (data.success && !data.error) {
    return redirect(routes.auth.signin);
  }

  return data;
}

export async function signIn(request: ActionFunctionArgs["request"]) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch("http://localhost:3300/auth/signin", {
    body,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();

  if (data.success && !data.error) {
    const cookies = response.headers.getSetCookie();
    const headers = new Headers();

    for (const cookie of cookies) {
      headers.append("Set-Cookie", cookie);
    }

    return redirect(routes.root, {
      headers,
    });
  }

  return data;
}

export async function signOut() {
  const response = await fetch("http://localhost:3300/auth/signout", {
    method: "post",
  });

  const data = await response.json();

  if (data.success && !data.error) {
    const cookies = response.headers.getSetCookie();
    const headers = new Headers();

    for (const cookie of cookies) {
      headers.append("Set-Cookie", cookie);
    }

    return redirect(routes.root, {
      headers,
    });
  }

  return data;
}

export async function recoverAccount(request: ActionFunctionArgs["request"]) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch("http://localhost:3300/auth/forgot-password", {
    body,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data;
}

export async function resetPassword(request: ActionFunctionArgs["request"]) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const formData = await request.formData();
  const formDataFields = fromFormDataToObject(formData);

  const body = new URLSearchParams({ ...searchParams, ...formDataFields });

  const response = await fetch("http://localhost:3300/auth/reset-password", {
    body,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data;
}

export async function redirectAuthenticatedUserToHome(headers: Headers) {
  const profile = await profileCookie.getSession(headers.get("Cookie"));

  const id = profile.get("id");
  const role = profile.get("userRole");

  if (id && role) {
    if (role === UserRoles.ADMIN) return redirect(routes.admin.home);
    if (role === UserRoles.CUSTOMER) return redirect(routes.customer.home);
  }
}
