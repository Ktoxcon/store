import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Badge,
  Container,
  Flex,
  IconButton,
  Table,
  Tooltip,
} from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { Product } from "@store/lib/types/product";
import { AppLink } from "../ui/app-link";
import { DeleteProductForm } from "./delete-product-form";

export type ProductsListProps = {
  products: Product[] | null;
};

export function ProductsList({ products }: ProductsListProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Creation Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Update Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {products && products?.length > 0 ? (
          products.map((product) => {
            return (
              <Table.Row key={product.id}>
                <Table.RowHeaderCell>{product.name}</Table.RowHeaderCell>
                <Table.Cell>
                  {product.active ? (
                    <Badge color="green">Active</Badge>
                  ) : (
                    <Badge color="red">Inactive</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {new Date(product.createdAt).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {new Date(product.updatedAt).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Flex align="center" gap="4">
                    <Tooltip content="Edit Product">
                      <IconButton asChild variant="ghost">
                        <AppLink to={routes.admin.product(product.id)}>
                          <Pencil1Icon />
                        </AppLink>
                      </IconButton>
                    </Tooltip>
                    <DeleteProductForm id={product.id} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell>
              <Container size="1">No Products</Container>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
