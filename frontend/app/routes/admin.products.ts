import { listCategories } from "@store/lib/actions/categories.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";

export const loader = ProtectedAdminRoute(async ({ request }) => {
  const response = await listCategories(request);
  return response;
});
