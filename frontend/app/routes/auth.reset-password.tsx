import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { PasswordInput } from "@store/components/ui/password-input";
import {
  redirectAuthenticatedUserToHome,
  resetPassword,
} from "@store/lib/actions/auth.actions";
import routes from "@store/lib/constants/routes";
import { ResetPasswordFormSchema } from "@store/lib/validators/auth.schemas";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  redirect,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import type { Route } from "./+types/auth.reset-password";

export const meta: MetaFunction = () => {
  return [{ title: "Reset Password" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return redirectAuthenticatedUserToHome(request.headers);
}

export async function action({ request }: ActionFunctionArgs) {
  await resetPassword(request);
  return redirect(routes.auth.signin);
}

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const form = useRef<HTMLFormElement>(null);

  const { reset, register, formState } = useForm({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordFormSchema),
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
        <Heading as="h2">Set Up Your New Password</Heading>
      </Box>
      <Form method="post" ref={form}>
        <Flex direction="column" gap="4">
          <PasswordInput
            size="3"
            required
            id="password"
            placeholder="New Password"
            {...register("password", { required: true })}
          />
          <PasswordInput
            size="3"
            required
            minLength={8}
            id="confirmation"
            placeholder="Confirm New Password"
            {...register("confirmation", {
              required: true,
            })}
          />

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
              Reset Password
            </Button>
          </Box>
        </Flex>
      </Form>
    </>
  );
}
