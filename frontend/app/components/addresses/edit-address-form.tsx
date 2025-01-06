import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import routes from "@store/lib/constants/routes";
import type { Address } from "@store/lib/types/address";
import type { User } from "@store/lib/types/user";
import { EditAddressFormSchema } from "@store/lib/validators/address.schema";
import { useForm } from "react-hook-form";
import { Form, useNavigation, useRouteLoaderData } from "react-router";
import { AppLink } from "../ui/app-link";

export type EditAddressFormProps = { address: Address };

export function EditAddressForm({ address }: EditAddressFormProps) {
  const user = useRouteLoaderData<User>("root");
  const navigation = useNavigation();

  const { register, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(EditAddressFormSchema),
  });

  return (
    <Form method="PATCH" action={routes.customer.address(address.id)}>
      <Flex gap="3" direction="column">
        <Box display="none">
          <TextField.Root
            id="user"
            name="userId"
            type="hidden"
            value={user?.id}
          />
        </Box>
        <Box>
          <label htmlFor="name">
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
          </label>
          <TextField.Root
            id="name"
            defaultValue={address.name}
            placeholder="Enter address name"
            {...register("name")}
          />
        </Box>
        <Box>
          <label htmlFor="recipient">
            <Text as="div" size="2" mb="1" weight="bold">
              Recipient
            </Text>
          </label>
          <TextField.Root
            id="price"
            defaultValue={address.recipient}
            placeholder="Enter recipient"
            {...register("recipient")}
          />
        </Box>
        <Box>
          <label htmlFor="phone">
            <Text as="div" size="2" mb="1" weight="bold">
              Phone
            </Text>
          </label>
          <TextField.Root
            id="price"
            type="tel"
            defaultValue={address.phone}
            placeholder="Enter address phone number"
            {...register("phone")}
          />
        </Box>
        <Box>
          <label htmlFor="addressLine">
            <Text as="div" size="2" mb="1" weight="bold">
              Address Line
            </Text>
          </label>
          <TextArea
            id="addressLine"
            placeholder="Enter address line"
            defaultValue={address.addressLine}
            {...register("addressLine")}
          />
        </Box>
        <Box>
          <label htmlFor="secondAddressLine">
            <Text as="div" size="2" mb="1" weight="bold">
              Second Address Line
            </Text>
          </label>
          <TextArea
            id="secondAddressLine"
            placeholder="Enter second address line"
            defaultValue={address.secondAddressLine}
            {...register("secondAddressLine")}
          />
        </Box>
        <Box>
          <label htmlFor="department">
            <Text as="div" size="2" mb="1" weight="bold">
              Department
            </Text>
          </label>
          <TextField.Root
            id="department"
            placeholder="Enter department"
            defaultValue={address.department}
            {...register("department")}
          />
        </Box>
        <Box>
          <label htmlFor="township">
            <Text as="div" size="2" mb="1" weight="bold">
              Township
            </Text>
          </label>
          <TextField.Root
            id="township"
            placeholder="Enter township"
            defaultValue={address.township}
            {...register("township")}
          />
        </Box>
        <Flex
          py="8"
          gap="3"
          justify={{ initial: "center", lg: "end" }}
          direction={{ initial: "column-reverse", lg: "row" }}
        >
          <Button type="button" color="red" variant="outline" asChild>
            <AppLink underline="none" to={routes.customer.addresses}>
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
      </Flex>
    </Form>
  );
}
