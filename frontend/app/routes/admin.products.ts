import { listCategories } from "@store/lib/actions/categories.actions";
import { ProtectedAdminRoute } from "@store/lib/auth/decorators";

export const loader = ProtectedAdminRoute(async ({ request }) => {
  const result = await listCategories(request);
  return result;
});
