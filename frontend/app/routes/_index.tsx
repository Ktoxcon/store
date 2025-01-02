import { Button, Section } from "@radix-ui/themes";
import { StoreFooter } from "@store/components/common/store-footer";
import { StoreNavbar } from "@store/components/common/store-nav";
import { AppLink } from "@store/components/ui/app-link";
import { redirectAuthenticatedUserToHome } from "@store/lib/actions/auth.actions";
import routes from "@store/lib/constants/routes";
import { type LoaderFunctionArgs, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "Store" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return redirectAuthenticatedUserToHome(request.headers);
}

export default function Home() {
  return (
    <>
      <StoreNavbar />
      <Section py="0" position="relative">
        <img
          alt="Multiple store products"
          style={{ maxWidth: "100%", objectFit: "cover", opacity: 0.9 }}
          src="https://cdn.prod.website-files.com/6048ec75bd641c038b84031e/663b67c69a3433ab38bbe3a5_cover-img-product-photography.webp"
        />
        <Button
          asChild
          size="4"
          style={{
            top: "50%",
            left: "50%",
            textWrap: "nowrap",
            position: "absolute",
            transform: "translate(-50%,-50%)",
          }}
        >
          <AppLink to={routes.auth.signin}>Let's Start!</AppLink>
        </Button>
      </Section>
      <StoreFooter />
    </>
  );
}
