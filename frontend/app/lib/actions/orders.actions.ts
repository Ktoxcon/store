import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { profileCookie } from "../auth/session-cookie";
import { fromFormDataToObject } from "../http/form-data";
import type { Order } from "../types/orders";

export async function getOrder({
  params,
  request,
}: LoaderFunctionArgs): Promise<Order> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/orders/${params.id}`,
    {
      headers: request.headers,
    }
  );
  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function createOrder(request: ActionFunctionArgs["request"]) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(`${process.env.APP_BACKEND}/orders`, {
    body,
    method: "POST",
    headers: request.headers,
  });

  const data = await response.json();
  return data;
}

export async function updateOrder({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(
    `${process.env.APP_BACKEND}/orders/${params.id}`,
    {
      body,
      method: "PATCH",
      headers: request.headers,
    }
  );

  const data = await response.json();
  return data;
}

export async function listOrders({
  query,
  request,
}: LoaderFunctionArgs & { query?: URLSearchParams }) {
  const response = await fetch(
    `${process.env.APP_BACKEND}/orders?${query?.toString()}`,
    {
      headers: request.headers,
    }
  );

  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function listCustomerOrders({
  request,
  ...args
}: LoaderFunctionArgs) {
  const headers = request.headers;
  const profile = await profileCookie.getSession(headers.get("Cookie"));

  const query = new URLSearchParams({
    userId: profile.data.id,
  });

  const response = await listOrders({ ...args, query, request });
  return response;
}
