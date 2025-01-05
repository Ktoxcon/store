import { render } from "@react-email/components";
import AppConfig from "@store/config/app.config";
import type { User } from "@store/models/user.model";
import { sign } from "jsonwebtoken";
import { emailClient } from "../clients/email";
import { SetupPasswordEmailTemplate } from "./templates/setup-password";

export type SendPasswordSetupEmailArgs = {
  user: User;
  body: string;
  title: string;
};

export async function sendPasswordSetUpEmail({
  user,
  body,
  title,
}: SendPasswordSetupEmailArgs) {
  const { id, name, email } = user.dataValues;

  const setupToken = sign(
    {
      data: { id, name, email },
    },
    AppConfig.sessionSecret,
    {
      expiresIn: "24h",
    }
  );

  const link = new URL(`${process.env.APP_URL!}/auth/reset-password`);
  link.searchParams.append("token", setupToken);
  link.searchParams.append("id", user.id.toString());

  const html = await render(
    SetupPasswordEmailTemplate({
      name,
      body,
      email,
      title,
      setupLink: link.toString(),
    })
  );

  await emailClient.sendMail({
    from: '"Store Support" <support@store.com>',
    to: user.email,
    subject: `Store | ${title}`,
    text: `Password Set Up`,
    html,
  });
}
