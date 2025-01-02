import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { NavBar } from "../ui/navbar";

export function StoreNavbar() {
  return (
    <NavBar>
      <NavBar.Left />
      <NavBar.Center />
      <NavBar.Right>
        <AppLink to={routes.auth.signin}>Sign In</AppLink>
      </NavBar.Right>
    </NavBar>
  );
}
