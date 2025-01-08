import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { Order } from "@store/lib/types/orders";
import { EditCategoryFormSchema } from "@store/lib/validators/category.schemas";
import { useForm } from "react-hook-form";
import { Form, useNavigation } from "react-router";
import { AppLink } from "../ui/app-link";

export type EditOrderFormProps = { order: Order };

export function EditCategoryForm({ order }: EditOrderFormProps) {
  const navigation = useNavigation();
  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(EditCategoryFormSchema),
  });

  return (
    <Form method="PATCH" action={routes.admin.order(order.id.toString())}>
      <Flex direction="column" gap="6"></Flex>
      <Flex
        py="8"
        gap="3"
        justify={{ initial: "center", lg: "end" }}
        direction={{ initial: "column-reverse", lg: "row" }}
      >
        <Button type="button" color="red" variant="outline" asChild>
          <AppLink underline="none" to={routes.admin.categories}>
            Cancel
          </AppLink>
        </Button>
        <Button
          type="submit"
          loading={navigation.state === "submitting"}
          disabled={
            !formState.isDirty ||
            !formState.isValid ||
            navigation.state === "submitting"
          }
        >
          Save
        </Button>
      </Flex>
    </Form>
  );
}
