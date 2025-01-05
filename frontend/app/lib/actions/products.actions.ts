import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { ProductCategory } from "../types/category";
import type { List } from "../types/common";

export async function getProduct({
  params,
  request,
}: LoaderFunctionArgs): Promise<ProductCategory> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/products/${params.id}`,
    {
      headers: request.headers,
    }
  );
  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function listProducts(
  request: LoaderFunctionArgs["request"]
): Promise<List<ProductCategory>> {
  const response = await fetch(`${process.env.APP_BACKEND}/products`, {
    headers: request.headers,
  });
  const parsedResponse = await response.json();

  return parsedResponse.data;
}

export async function createProduct(request: ActionFunctionArgs["request"]) {
  const body = await request.formData();

  const headers = new Headers();
  headers.set("Cookie", request.headers.get("Cookie")!);

  const response = await fetch(`${process.env.APP_BACKEND}/products`, {
    body,
    headers,
    method: "POST",
  });

  const data = await response.json();
  return data;
}

export async function updateProduct({ params, request }: ActionFunctionArgs) {
  const body = await request.formData();

  const headers = new Headers();
  headers.set("Cookie", request.headers.get("Cookie")!);

  const response = await fetch(
    `${process.env.APP_BACKEND}/products/${params.id}`,
    {
      body,
      headers,
      method: "PATCH",
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteProduct({
  params,
  request,
}: LoaderFunctionArgs): Promise<ProductCategory> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/products/${params.id}`,
    {
      method: "DELETE",
      headers: request.headers,
    }
  );

  const data = await response.json();
  return data;
}
