import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Badge,
  Container,
  Flex,
  IconButton,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { ProductCategory } from "@store/lib/types/category";
import { AppLink } from "../ui/app-link";
import { DeleteCategoryForm } from "./delete-category-form";

export type CategoriesListProps = {
  categories: ProductCategory[] | null;
};

export function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text truncate>Creation Date</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Text truncate>Last Update Date</Text>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categories && categories?.length > 0 ? (
          categories.map((category) => {
            return (
              <Table.Row key={category.id}>
                <Table.RowHeaderCell>
                  <Text truncate>{category.name}</Text>
                </Table.RowHeaderCell>
                <Table.Cell>
                  {category.active ? (
                    <Badge color="green">Active</Badge>
                  ) : (
                    <Badge color="red">Inactive</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Text truncate>
                    {new Date(category.createdAt).toLocaleString()}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text truncate>
                    {new Date(category.updatedAt).toLocaleString()}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Flex align="center" gap="4">
                    <Tooltip content="Edit Category">
                      <IconButton asChild variant="ghost">
                        <AppLink to={routes.admin.category(category.id)}>
                          <Pencil1Icon />
                        </AppLink>
                      </IconButton>
                    </Tooltip>
                    <DeleteCategoryForm id={category.id} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell>
              <Container size="1">No Categories</Container>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
