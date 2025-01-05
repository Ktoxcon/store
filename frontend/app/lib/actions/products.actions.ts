import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { uploadImage } from "../files/upload-image";
import { fromFormDataToObject } from "../http/form-data";
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
  const formData = await request.formData();

  const pictureUploadResult = await uploadImage({
    formData,
    fileName: "picture",
  });

  const headers = new Headers(request.headers);
  headers.delete("content-type");
  headers.delete("content-length");
  headers.set("Content-Type", "application/x-www-form-urlencoded");

  const entries = fromFormDataToObject(formData);
  entries.picture = pictureUploadResult.secure_url;

  const body = new URLSearchParams(entries);

  const response = await fetch(`${process.env.APP_BACKEND}/products`, {
    body,
    headers,
    method: "POST",
  });

  const data = await response.json();
  return data;
}

export async function updateProduct({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = fromFormDataToObject(formData);
  const body = new URLSearchParams(entries);

  const response = await fetch(
    `${process.env.APP_BACKEND}/products/${params.id}`,
    {
      body,
      method: "PATCH",
      headers: request.headers,
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
