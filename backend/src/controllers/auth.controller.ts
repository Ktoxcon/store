import AppConfig from "@store/config/app.config";
import { DayInMilliseconds } from "@store/lib/constants/time";
import { encodeData } from "@store/lib/encode";
import {
  SignInRequestBodySchema,
  SignUpRequestBodySchema,
} from "@store/lib/validators/auth.schemas";
import { User } from "@store/models/user.model";
import { hash, verify } from "argon2";
import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { ZodError } from "zod";

export class AuthController {
  static async signUp(request: Request, response: Response) {
    try {
      console.dir(request.body);
      const { email, password, ...restUserProps } =
        SignUpRequestBodySchema.parse(request.body);

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        response.status(400).send({
          success: false,
          error: `User with the email: ${email} already exists.`,
        });
        return;
      }

      const passwordHash = await hash(password);

      await User.create({
        ...restUserProps,
        email,
        password: passwordHash,
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

      const user = await User.findOne({ where: { email } });

      if (!user) {
        response.status(404).send({
          success: false,
          error: `User with email: ${email} was not found.`,
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
}
