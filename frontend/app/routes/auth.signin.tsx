import { zodResolver } from "@hookform/resolvers/zod";
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
import { AppLink } from "@store/components/ui/app-link";
import { PasswordInput } from "@store/components/ui/password-input";
import {
  redirectAuthenticatedUserToHome,
  signIn,
} from "@store/lib/actions/auth.actions";
import routes from "@store/lib/constants/routes";
import { SignInFormSchema } from "@store/lib/validators/auth.schemas";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import type { Route } from "./+types/auth.signin";

export const meta: MetaFunction = () => {
  return [{ title: "Sign In" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return redirectAuthenticatedUserToHome(request.headers);
}

export async function action({ request }: ActionFunctionArgs) {
  const result = await signIn(request);
  return result;
}

export default function SignIn({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const form = useRef<HTMLFormElement>(null);

  const { register, reset, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(SignInFormSchema),
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
        <Heading as="h2">Sign In To Your Account</Heading>
        <Box pt="4">
          <Text as="p">
            Don't have an account?{" "}
            <Link asChild>
              <AppLink to={routes.auth.signup} prefetch="render">
                Sign Up
              </AppLink>
            </Link>
          </Text>
        </Box>
      </Box>
      <Form method="post" ref={form}>
        <Flex direction="column" gap="4">
          <TextField.Root
            size="3"
            id="email"
            required
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", { required: true })}
          />
          <PasswordInput
            size="3"
            id="password"
            required
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {actionData && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{actionData.error}</Callout.Text>
            </Callout.Root>
          )}
          <Box py="2">
            <Button
              size="3"
              style={{ width: "100%" }}
              loading={navigation.state === "submitting"}
              disabled={!formState.isDirty || !formState.isValid}
            >
              Sign In
            </Button>
          </Box>
          <Box>
            <Flex justify="center">
              <AppLink size="2" to={routes.auth.resetPassword}>
                Forgot Password?
              </AppLink>
            </Flex>
          </Box>
        </Flex>
      </Form>
    </>
  );
}
