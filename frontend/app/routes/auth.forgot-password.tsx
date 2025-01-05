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
import {
  recoverAccount,
  redirectAuthenticatedUserToHome,
} from "@store/lib/actions/auth.actions";
import routes from "@store/lib/constants/routes";
import { PasswordRecoveryFormSchema } from "@store/lib/validators/auth.schemas";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import type { Route } from "./+types/auth.forgot-password";

export const meta: MetaFunction = () => {
  return [{ title: "Forgot Password" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return redirectAuthenticatedUserToHome(request.headers);
}

export async function action({ request }: ActionFunctionArgs) {
  const response = await recoverAccount(request);
  return response;
}

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const form = useRef<HTMLFormElement>(null);

  const { reset, register, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(PasswordRecoveryFormSchema),
  });

  useEffect(() => {
    if (navigation.state === "idle") {
      reset();
      form.current?.reset();
    }
  }, [navigation.state, actionData]);

  return (
    <>
      <Box py="4">
        <Heading as="h2">Forgot Your Password?</Heading>
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
      <Form method="POST" ref={form}>
        <Flex direction="column" gap="4">
          <TextField.Root
            size="3"
            required
            id="email"
            type="email"
            autoComplete="on"
            placeholder="Email"
            {...register("email")}
          />
          {actionData?.success && (
            <Callout.Root color="green">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Please check your email inbox for your account recovery
                instructions.
              </Callout.Text>
            </Callout.Root>
          )}
          <Box py="2">
            <Button
              size="3"
              style={{ width: "100%" }}
              loading={navigation.state === "submitting"}
              disabled={
                !formState.isDirty ||
                !formState.isValid ||
                navigation.state === "submitting"
              }
            >
              Send Recovery Link
            </Button>
          </Box>
        </Flex>
      </Form>
    </>
  );
}
