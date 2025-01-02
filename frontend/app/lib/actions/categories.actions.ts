import type { LoaderFunctionArgs } from "react-router";

export async function listCategories(request: LoaderFunctionArgs["request"]) {
  const response = await fetch("http://localhost:3300/categories", {
    headers: request.headers,
  });
  const parsedResponse = await response.json();

  return parsedResponse.data;
}
