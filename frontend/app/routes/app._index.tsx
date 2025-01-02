import { Button, Flex, Heading, Section } from "@radix-ui/themes";
import { AppLink } from "@store/components/ui/app-link";
import { ProtectedRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";

export const loader = ProtectedRoute();

export default function CustomerHome() {
  return (
    <>
      <Section py="0" position="relative">
        <img
          alt="Multiple store products"
          style={{
            maxWidth: "100%",
            objectFit: "cover",
          }}
          src="https://cdn.prod.website-files.com/6048ec75bd641c038b84031e/663b67c69a3433ab38bbe3a5_cover-img-product-photography.webp"
        />
        <Flex
          gap="4"
          align="center"
          justify="center"
          direction="column"
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%,-50%)",
          }}
          width={{ initial: "80%", lg: "50%" }}
        >
          <Heading
            as="h1"
            size={{ initial: "8", lg: "9" }}
            style={{
              backdropFilter: "blur(20px)",
            }}
          >
            Welcome Back
          </Heading>
          <Button asChild size="4">
            <AppLink to={routes.customer.orders}>Discover Products</AppLink>
          </Button>
        </Flex>
      </Section>
      <Section px="4">
        <Heading as="h2">Deals</Heading>
      </Section>
    </>
  );
}
