import { Flex } from "@radix-ui/themes";
import { StoreFooter } from "@store/components/common/store-footer";
import { CustomerNavBar } from "@store/components/customer/customer-nav";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <CustomerNavBar />
      <Flex direction="column">
        <Outlet />
      </Flex>
      <StoreFooter />
    </>
  );
}
