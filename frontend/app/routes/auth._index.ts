import routes from "@store/lib/constants/routes";
import { redirect } from "react-router";

export async function loader() {
  return redirect(routes.auth.signin);
}
