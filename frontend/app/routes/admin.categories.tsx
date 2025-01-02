import { ProtectedAdminRoute } from "@store/lib/auth/decorators";

export const loader = ProtectedAdminRoute();

export default function AdminCategories() {
  return <h1>Admin Categories</h1>;
}
