import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { ShoppingCart } from "../cart/shopping-cart";
import { AppLink } from "../ui/app-link";
import { NavBar } from "../ui/navbar";
import { Account } from "../users/account";

export function CustomerNavBar() {
  return (
    <NavBar
      rows={{ initial: "2", lg: "1" }}
      columns={{ initial: "1", lg: "10% 80% 10%" }}
    >
      <NavBar.Left />
      <NavBar.Center
        justify={{ lg: "center" }}
        gridColumnEnd={{ initial: "span 3", lg: "auto" }}
      >
        <Box width={{ initial: "100%", lg: "75%" }}>
          <TextField.Root style={{ width: "100%" }} placeholder="Search Store">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </NavBar.Center>
      <NavBar.Right gap="4">
        <ShoppingCart />
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
