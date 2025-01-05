import {
  CubeIcon,
  DashboardIcon,
  ExitIcon,
  MixIcon,
  Pencil2Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Flex, Separator } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { SideBar } from "../ui/sidebar";

export function AdminSideBar() {
  return (
    <SideBar>
      <Flex direction="column" flexGrow="1" gap="4">
        <SideBar.Item>
          <DashboardIcon />
          <AppLink size="5" to={routes.admin.home}>
            Dashboard
          </AppLink>
        </SideBar.Item>
        <SideBar.Item>
          <MixIcon />
          <AppLink size="5" to={routes.admin.categories}>
            Categories
          </AppLink>
        </SideBar.Item>
        <SideBar.Item>
          <CubeIcon />
          <AppLink size="5" to={routes.admin.products}>
            Products
          </AppLink>
        </SideBar.Item>
        <SideBar.Item>
          <Pencil2Icon />
          <AppLink size="5" to={routes.admin.orders}>
            Orders
          </AppLink>
        </SideBar.Item>
        <SideBar.Item>
          <PersonIcon />
          <AppLink size="5" to={routes.admin.users}>
            Users
          </AppLink>
        </SideBar.Item>
        <Separator size="4" />
        <SideBar.Item>
          <ExitIcon />
          <AppLink size="5" to={routes.auth.signout}>
            Sign Out
          </AppLink>
        </SideBar.Item>
      </Flex>
    </SideBar>
  );
}
