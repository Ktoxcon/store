import { AdminNavBar } from "@store/components/admin/admin-nav";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}
