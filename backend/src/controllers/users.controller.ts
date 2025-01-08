import { UserStatus } from "@store/lib/constants/user-status";
import { sendPasswordSetUpEmail } from "@store/lib/emails";
import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  CreateUserRequestBodySchema,
  ListUsersRequestBodySchema,
} from "@store/lib/validators/user.schemas";
import { User } from "@store/models/user.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class UsersController {
  static async getUser(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const product = await User.findByPk(id);

      if (!product) {
        response.status(404).send({ success: false, error: "User not found." });
        return;
      }

      response.send({ success: true, data: product });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async createUser(request: Request, response: Response) {
    try {
      const { email, ...restAddressProps } = CreateUserRequestBodySchema.parse(
        request.body
      );

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        response.status(400).send({
          success: false,
          error: "User already exists.",
        });
        return;
      }

      const user = await User.create({
        ...restAddressProps,
        email,
        status: UserStatus.PENDING,
      });

      await sendPasswordSetUpEmail({
        user,
        title: "Set Up Your New Account",
        body: "Here's an invitation link to join Store. Click the link below to set up your new account.",
      });

      response.send({ success: true });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateUser(request: Request, response: Response) {
    try {
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async listUsers(request: Request, response: Response) {
    try {
      const { limit, offset, ...filters } = ListUsersRequestBodySchema.parse(
        request.query
      );

      const { count, rows } = await User.findAndCountAll({
        where: {
          ...filters,
        },
        limit,
        offset,
      });

      response.send({ success: true, data: { count, items: rows } });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }
}
