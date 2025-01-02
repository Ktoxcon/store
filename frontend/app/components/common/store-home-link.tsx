import routes from "@store/lib/constants/routes";
import { AppLink } from "../ui/app-link";
import { StoreLogo } from "./store-logo";

export function StoreHomeLink() {
  return (
    <AppLink to={routes.root}>
      <StoreLogo />
    </AppLink>
  );
}
