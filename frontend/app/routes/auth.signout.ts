import { signOut } from "@store/lib/actions/auth.actions";
import { ProtectedRoute } from "@store/lib/auth/decorators";

export const loader = ProtectedRoute(async () => {
  const response = await signOut();
  return response;
});
