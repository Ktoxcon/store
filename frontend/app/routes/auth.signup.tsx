import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import { SignUpFormErrors } from "@store/components/auth/signup-errors";
import { AppLink } from "@store/components/ui/app-link";
import { PasswordInput } from "@store/components/ui/password-input";
import {
  redirectAuthenticatedUserToHome,
  signUp,
} from "@store/lib/actions/auth.actions";
import routes from "@store/lib/constants/routes";
import { SignUpFormSchema } from "@store/lib/validators/auth.schemas";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import type { Route } from "./+types/auth.signup";

export const meta: MetaFunction = () => {
  return [{ title: "Sign Up" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return redirectAuthenticatedUserToHome(request.headers);
}

export async function action({ request }: ActionFunctionArgs) {
  const result = await signUp(request);
  return result;
}

export default function SignUp({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const form = useRef<HTMLFormElement>(null);

  const { register, reset, formState, control } = useForm({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
  });

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.error) {
      reset();
      form.current?.reset();
    }
  }, [navigation.state, actionData]);

  return (
    <>
      <Box py="4">
        <Heading as="h2">Create An Account</Heading>
        <Box pt="4">
          <Text as="p">
            Already have an account?{" "}
            <Link asChild>
              <AppLink to={routes.auth.signin} prefetch="render">
                Sign In
              </AppLink>
            </Link>
          </Text>
        </Box>
      </Box>
      <Form method="post" ref={form}>
        <Flex direction="column" gap="4">
          <TextField.Root
            size="3"
            required
            type="text"
            id="first-name"
            placeholder="First Name"
            {...register("name", { required: true })}
          />
          <TextField.Root
            size="3"
            required
            type="text"
            id="last-name"
            placeholder="Last Name"
            {...register("lastName", { required: true })}
          />
          <TextField.Root
            size="3"
            required
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <PasswordInput
            size="3"
            required
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <PasswordInput
            size="3"
            required
            minLength={8}
            id="confirmation"
            placeholder="Confirm Password"
            {...register("confirmation", {
              required: true,
            })}
          />
          {actionData && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{actionData.error}</Callout.Text>
            </Callout.Root>
          )}
          <SignUpFormErrors control={control} />
          <Box py="2">
            <Button
              size="3"
              style={{ width: "100%" }}
              loading={navigation.state === "submitting"}
              disabled={!formState.isDirty || !formState.isValid}
            >
              Create Account
            </Button>
          </Box>
        </Flex>
      </Form>
    </>
  );
}
