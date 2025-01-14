import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import type { List } from "../types/common";
import type { Product } from "../types/product";

export async function getProduct({
  params,
  request,
}: LoaderFunctionArgs): Promise<Product> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/products/${params.id}`,
    {
      headers: request.headers,
    }
  );
  const parsedResponse = await response.json();
  return parsedResponse.data;
}

export async function listProducts({
  request,
  searchParams,
}: LoaderFunctionArgs & { searchParams?: URLSearchParams }): Promise<
  List<Product>
> {
  const response = await fetch(
    `${process.env.APP_BACKEND}/products?${searchParams?.toString()}`,
    {
      headers: request.headers,
    }
  );

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

  const parsedResponse = await response.json();
  return parsedResponse;
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

  const parsedResponse = await response.json();
  return parsedResponse;
}

export async function deleteProduct({ params, request }: LoaderFunctionArgs) {
  const response = await fetch(
    `${process.env.APP_BACKEND}/products/${params.id}`,
    {
      method: "DELETE",
      headers: request.headers,
    }
  );

  const parsedResponse = await response.json();
  return parsedResponse;
}

export async function listActiveProducts(args: LoaderFunctionArgs) {
  const searchParams = new URLSearchParams({ active: "true" });

  const parsedResponse = await listProducts({ ...args, searchParams });
  return parsedResponse;
}
