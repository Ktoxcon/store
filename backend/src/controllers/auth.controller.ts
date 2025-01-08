import AppConfig from "@store/config/app.config";
import { DayInMilliseconds } from "@store/lib/constants/time";
import { UserStatus } from "@store/lib/constants/user-status";
import { sendPasswordSetUpEmail } from "@store/lib/emails";
import { encodeData } from "@store/lib/encode";
import {
  ResetPasswordRequestBodySchema,
  SendRecoveryLinkRequestBodySchema,
  SignInRequestBodySchema,
  SignUpRequestBodySchema,
} from "@store/lib/validators/auth.schemas";
import { User } from "@store/models/user.model";
import { hash, verify } from "argon2";
import type { Request, Response } from "express";
import { type JwtPayload, sign, verify as verifyToken } from "jsonwebtoken";
import { ZodError } from "zod";

export class AuthController {
  static async signUp(request: Request, response: Response) {
    try {
      const { email, password, ...restUserProps } =
        SignUpRequestBodySchema.parse(request.body);

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        response.status(400).send({
          success: false,
          error: "User already exists.",
        });
        return;
      }

      const passwordHash = await hash(password);

      await User.create({
        ...restUserProps,
        email,
        password: passwordHash,
        status: UserStatus.ACTIVE,
      });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async signIn(request: Request, response: Response) {
    try {
      const { email, password } = SignInRequestBodySchema.parse(request.body);

      const user = await User.findOne({
        where: { email, status: UserStatus.ACTIVE },
      });

      if (!user) {
        response.status(404).send({
          success: false,
          error: "User not found.",
        });
        return;
      }

      const passwordMatches = await verify(user.password, password);

      if (!passwordMatches) {
        response.status(400).send({
          success: false,
          error: "Email or password are incorrect.",
        });
        return;
      }

      const { password: userPassword, ...restUserProps } = user.dataValues;

      const session = sign(
        {
          data: { ...restUserProps },
        },
        AppConfig.sessionSecret,
        {
          expiresIn: "24h",
        }
      );

      response.cookie("session", session, {
        sameSite: true,
        httpOnly: true,
        maxAge: DayInMilliseconds,
      });

      response.cookie("profile", encodeData(restUserProps), {
        sameSite: true,
        httpOnly: true,
        maxAge: DayInMilliseconds,
      });

      response.send({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async signOut(_request: Request, response: Response) {
    try {
      response.clearCookie("session");
      response.clearCookie("profile");

      response.send({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.status(500).send({ success: false, error: error.message });
      }
    }
  }

  static async recoverAccount(request: Request, response: Response) {
    try {
      const { email } = SendRecoveryLinkRequestBodySchema.parse(request.body);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        response.status(404).send({
          success: false,
          error: "User not found.",
        });
        return;
      }

      await sendPasswordSetUpEmail({
        user,
        title: "Recover Your Account",
        body: "Here's the recovery link you requested. Click the link below to reset your password.",
      });

      response.send({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async resetPassword(request: Request, response: Response) {
    try {
      const { password, token } = ResetPasswordRequestBodySchema.parse(
        request.body
      );

      const decodedToken = (await verifyToken(
        token,
        AppConfig.sessionSecret
      )) as JwtPayload;

      const id = decodedToken.data.id;
      const user = await User.findOne({ where: { id } });

      if (!user) {
        response.status(404).send({
          success: false,
          error: `User not found.`,
        });
        return;
      }

      const passwordHash = await hash(password);

      await User.update(
        { password: passwordHash, status: UserStatus.ACTIVE },
        { where: { id } }
      );

      response.send({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }
}
