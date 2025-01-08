import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { fromFormDataToObject } from "../http/form-data";
import type { ProductCategory } from "../types/category";
import type { List } from "../types/common";

export async function getCategory({
  params,
  request,
}: LoaderFunctionArgs): Promise<ProductCategory> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/categories/${params.id}`,
    {
      headers: request.headers,
    }
  );
  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function listCategories(
  request: LoaderFunctionArgs["request"]
): Promise<List<ProductCategory>> {
  const response = await fetch(`${process.env.APP_BACKEND}/categories`, {
    headers: request.headers,
  });

  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function createCategory(request: ActionFunctionArgs["request"]) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(`${process.env.APP_BACKEND}/categories`, {
    body,
    method: "POST",
    headers: request.headers,
  });

  const data = await response.json();
  return data;
}

export async function updateCategory({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(
    `${process.env.APP_BACKEND}/categories/${params.id}`,
    {
      body,
      method: "PATCH",
      headers: request.headers,
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteCategory({
  params,
  request,
}: LoaderFunctionArgs): Promise<ProductCategory> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/categories/${params.id}`,
    {
      method: "DELETE",
      headers: request.headers,
    }
  );
  const parsedResponse = await response.json();
  return parsedResponse.data;
}
