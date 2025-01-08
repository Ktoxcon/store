import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { fromFormDataToObject } from "../http/form-data";
import type { Address } from "../types/address";
import type { List } from "../types/common";

export async function getAddress({
  params,
  request,
}: LoaderFunctionArgs): Promise<Address> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/addresses/${params.id}`,
    {
      headers: request.headers,
    }
  );

  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function listAddresses({
  query,
  request,
}: LoaderFunctionArgs & { query?: URLSearchParams }): Promise<List<Address>> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/addresses?${query?.toString()}`,
    {
      headers: request.headers,
    }
  );

  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function createAddress(request: ActionFunctionArgs["request"]) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(`${process.env.APP_BACKEND}/addresses`, {
    body,
    method: "POST",
    headers: request.headers,
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export async function updateAddress({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(
    `${process.env.APP_BACKEND}/addresses/${params.id}`,
    {
      body,
      method: "PATCH",
      headers: request.headers,
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteAddress({ params, request }: LoaderFunctionArgs) {
  const response = await fetch(
    `${process.env.APP_BACKEND}/addresses/${params.id}`,
    {
      method: "DELETE",
      headers: request.headers,
    }
  );

  const data = await response.json();
  return data;
}
