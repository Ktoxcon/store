import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { NavBar } from "../ui/navbar";
import { Account } from "../users/account";

export function CustomerNavBar() {
  return (
    <NavBar>
      <NavBar.Left />
      <NavBar.Center justify="center">
        <TextField.Root style={{ width: "75%" }} placeholder="Search Store">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </NavBar.Center>
      <NavBar.Right>
        <Account>
          <Account.Section title="Your Account">
            <AppLink to={routes.customer.profile} size="2">
              Profile
            </AppLink>
            <AppLink to={routes.customer.orders} size="2">
              Orders
            </AppLink>
            <AppLink to={routes.customer.addresses} size="2">
              Adresses
            </AppLink>
          </Account.Section>
        </Account>
      </NavBar.Right>
    </NavBar>
  );
}
