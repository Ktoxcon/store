import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { NavBar } from "../ui/navbar";
import { Account } from "../users/account";
import { AdminSideBar } from "./admin-sidebar";

export function AdminNavBar() {
  return (
    <NavBar>
      <NavBar.Left>
        <AdminSideBar />
      </NavBar.Left>
      <NavBar.Center />
      <NavBar.Right>
        <Account>
          <Account.Section title="Your Account">
            <AppLink to={routes.admin.profile} size="2">
              Profile
            </AppLink>
          </Account.Section>
        </Account>
      </NavBar.Right>
    </NavBar>
  );
}
