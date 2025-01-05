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
import { useState } from "react";
import { AppLink } from "../ui/app-link";
import { SideBar } from "../ui/sidebar";

export function AdminSideBar() {
  const [isSideBarOpen, setSideBarVisibility] = useState(false);

  const handleSideBarItemClick = () => {
    setSideBarVisibility(false);
  };

  return (
    <SideBar open={isSideBarOpen} onOpenChange={setSideBarVisibility}>
      <Flex direction="column" flexGrow="1" gap="4">
        <SideBar.Item onClick={handleSideBarItemClick}>
          <DashboardIcon />
          <AppLink size="5" to={routes.admin.home}>
            Dashboard
          </AppLink>
        </SideBar.Item>
        <SideBar.Item onClick={handleSideBarItemClick}>
          <MixIcon />
          <AppLink size="5" to={routes.admin.categories}>
            Categories
          </AppLink>
        </SideBar.Item>
        <SideBar.Item onClick={handleSideBarItemClick}>
          <CubeIcon />
          <AppLink size="5" to={routes.admin.products}>
            Products
          </AppLink>
        </SideBar.Item>
        <SideBar.Item onClick={handleSideBarItemClick}>
          <Pencil2Icon />
          <AppLink size="5" to={routes.admin.orders}>
            Orders
          </AppLink>
        </SideBar.Item>
        <SideBar.Item onClick={handleSideBarItemClick}>
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
