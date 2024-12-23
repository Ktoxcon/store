import {
  CreateAddressRequestBodySchema,
  ListAddressesRequestBodySchema,
  OptionalAddressDataSchema,
} from "@store/lib/validators/address.schemas";
import { IdParamSchema } from "@store/lib/validators/model.schemas";
import { Address } from "@store/models/address.model";
import { User } from "@store/models/user.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class AddressesController {
  static async getAddress(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const address = await Address.findByPk(id);

      if (!address) {
        response
          .status(404)
          .send({ success: false, error: "Address not found." });
        return;
      }

      response.send({ success: true, data: address });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async createAddress(request: Request, response: Response) {
    try {
      const { name, userId, ...restAddressProps } =
        CreateAddressRequestBodySchema.parse(request.body);

      const userExists = await User.findByPk(userId);

      if (!userExists) {
        response.status(404).send({ success: false, error: "User not found." });
        return;
      }

      const addressAlreadyExists = await Address.findOne({ where: { name } });

      if (addressAlreadyExists) {
        response
          .status(400)
          .send({ success: false, error: "Address already exists." });
        return;
      }

      const newAddress = await Address.create({
        ...restAddressProps,
        name,
        UserId: userId,
      });

      response.send({ success: true, data: newAddress });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateAddress(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const addressUpdatePayload = OptionalAddressDataSchema.parse(
        request.body
      );

      const address = await Address.findByPk(id);

      if (!address) {
        response
          .status(404)
          .send({ success: false, error: "Address not found." });
        return;
      }

      await Address.update(addressUpdatePayload, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async listAddresses(request: Request, response: Response) {
    try {
      const { limit, offset, ...filters } =
        ListAddressesRequestBodySchema.parse(request.body);

      const { count, rows } = await Address.findAndCountAll({
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

  static async deleteAddress(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const address = await Address.findByPk(id);

      if (!address) {
        response
          .status(404)
          .send({ success: false, error: "Address not found." });
        return;
      }

      await Address.destroy({ where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }
}
