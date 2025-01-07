import type { ActionFunctionArgs } from "react-router";
import { fromFormDataToObject } from "../http/form-data";

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
