import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Text } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { User } from "@store/lib/types/user";
import { EditUserFormSchema } from "@store/lib/validators/user.schema";
import { useForm } from "react-hook-form";
import { Form, useNavigation } from "react-router";
import { AppLink } from "../ui/app-link";
import { UserStatusSelector } from "./user-status-selector";
import { UserSummary } from "./user-summary";

export type EditUserFormProps = { user: User };

export function EditUserForm({ user }: EditUserFormProps) {
  const navigation = useNavigation();
  const { register, control, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(EditUserFormSchema),
  });

  return (
    <Form method="PATCH" action={routes.admin.user(user.id)}>
      <Flex py="4">
        <UserSummary user={user} />
      </Flex>
      <Flex py="4" direction="column" gap="2">
        <label htmlFor="name">
          <Text as="div" size="2" mb="1" weight="bold">
            New User Status
          </Text>
        </label>
        <UserStatusSelector
          control={control}
          defaultValue={user.status}
          {...register("status")}
        />
      </Flex>
      <Flex
        py="8"
        gap="3"
        justify={{ initial: "center", lg: "end" }}
        direction={{ initial: "column-reverse", lg: "row" }}
      >
        <Button type="button" color="red" variant="outline" asChild>
          <AppLink underline="none" to={routes.admin.users}>
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
