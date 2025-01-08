import { Button, Container, Flex, Heading, Section } from "@radix-ui/themes";
import { StoreFooter } from "@store/components/common/store-footer";
import { CustomerNavBar } from "@store/components/customer/customer-nav";
import { ProductCard } from "@store/components/products/product-card";
import { AppLink } from "@store/components/ui/app-link";
import { Carousel } from "@store/components/ui/carousel";
import { listProducts } from "@store/lib/actions/products.actions";
import { ProtectedCustomerRoute } from "@store/lib/auth/decorators";
import routes from "@store/lib/constants/routes";
import type { List } from "@store/lib/types/common";
import type { Product } from "@store/lib/types/product";
import { groupBy } from "@store/lib/utils/group-by";
import type { Route } from "./+types/app_._index";

export const loader = ProtectedCustomerRoute(async ({ request }) => {
  const response = await listProducts(request);
  return response;
});

export default function CustomerHome({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData as List<Product>;

  const productsByCategory = Object.entries(
    groupBy(items, ({ ProductCategory }) => {
      return ProductCategory.name;
    })
  );

  return (
    <>
      <CustomerNavBar />
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
            <AppLink to={routes.customer.orders}>Check Out My Orders</AppLink>
          </Button>
        </Flex>
      </Section>
      {productsByCategory.map(([category, products]) => (
        <Section size="1" key={category}>
          <Container px="4">
            <Heading>{category}</Heading>
            <Carousel scrollStep={200}>
              {products.map((product) => (
                <ProductCard key={product.id} size="sm" product={product} />
              ))}
            </Carousel>
          </Container>
        </Section>
      ))}
      <StoreFooter />
    </>
  );
}
