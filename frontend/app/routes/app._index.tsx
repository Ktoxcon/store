import { Button, Flex, Heading, Section } from "@radix-ui/themes";
import { ProductCard } from "@store/components/products/product-card";
import { AppLink } from "@store/components/ui/app-link";
import { Carousel } from "@store/components/ui/carousel";
import { listProducts } from "@store/lib/actions/products.actions";
import { ProtectedRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { List } from "@store/lib/types/common";
import type { Product } from "@store/lib/types/product";
import type { Route } from "./+types/app._index";

export const loader = ProtectedRoute(async ({ request }) => {
  const response = await listProducts(request);
  return response;
});

export default function CustomerHome({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Product>;

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
        <Carousel>
          {items.map((product) => (
            <ProductCard product={product} />
          ))}
        </Carousel>
      </Section>
    </>
  );
}
