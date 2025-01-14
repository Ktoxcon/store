import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { OrderStatus } from "../constants/order-status";
import { fromFormDataToObject } from "../http/form-data";
import type { Order } from "../types/orders";
import { getProfile } from "./profile.actions";

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

export async function createOrder({ request }: ActionFunctionArgs) {
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
  request,
  searchParams,
}: LoaderFunctionArgs & { searchParams?: URLSearchParams }) {
  const response = await fetch(
    `${process.env.APP_BACKEND}/orders?${searchParams?.toString()}`,
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
  const profile = await getProfile({ request, ...args });
  const searchParams = new URLSearchParams({
    userId: profile.id,
  });

  const response = await listOrders({ ...args, request, searchParams });

  return response;
}

export async function listPendingOrders(args: LoaderFunctionArgs) {
  const searchParams = new URLSearchParams({ status: OrderStatus.PENDING });

  const response = await listOrders({ ...args, searchParams });
  return response;
}
