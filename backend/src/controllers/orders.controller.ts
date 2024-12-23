import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  ConfirmOrderRequestBodySchema,
  CreateOrderRequestBodySchema,
  ListOrdersRequestBodySchema,
  UpdateOrderRequestBodySchema,
} from "@store/lib/validators/order.schemas";
import { Address } from "@store/models/address.model";
import { Order } from "@store/models/order.model";
import { User } from "@store/models/user.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class OrdersController {
  static async getOrder(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const order = await Order.findByPk(id);

      if (!order) {
        response
          .status(404)
          .send({ success: false, error: "Order not found." });
        return;
      }

      response.send({ success: true, data: order });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async createOrder(request: Request, response: Response) {
    try {
      const { userId, addressId } = CreateOrderRequestBodySchema.parse(
        request.body
      );

      const userExists = await User.findByPk(userId);

      if (!userExists) {
        response.status(404).send({ success: false, error: "User not found." });
        return;
      }

      const addressExists = await Address.findByPk(addressId);

      if (!addressExists) {
        response
          .status(404)
          .send({ success: false, error: "Address not found." });
        return;
      }

      const newOrder = await Order.create({
        UserId: userId,
        AddressId: addressId,
      });

      response.send({ success: true, data: newOrder });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateOrder(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const { addressId } = UpdateOrderRequestBodySchema.parse(request.body);

      const order = await Order.findByPk(id);

      if (!order) {
        response
          .status(404)
          .send({ success: false, error: "Order not found." });
        return;
      }

      const addressExists = await Address.findByPk(addressId);

      if (!addressExists) {
        response
          .status(404)
          .send({ success: false, error: "Address not found." });
        return;
      }

      await Order.update({ AddressId: addressId }, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateOrderConfirmationStatus(
    request: Request,
    response: Response
  ) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const { confirmed } = ConfirmOrderRequestBodySchema.parse(request.body);

      const order = await Order.findByPk(id);

      if (!order) {
        response
          .status(404)
          .send({ success: false, error: "Order not found." });
        return;
      }

      await Order.update({ confirmed }, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async cancellOrder(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const order = await Order.findByPk(id);

      if (!order) {
        response
          .status(404)
          .send({ success: false, error: "Order not found." });
        return;
      }

      await Order.update({ cancelled: true }, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async listOrders(request: Request, response: Response) {
    try {
      const { limit, offset, userId, addressId } =
        ListOrdersRequestBodySchema.parse(request.body);

      const { count, rows } = await Order.findAndCountAll({
        where: {
          UserId: userId,
          AddressId: addressId,
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
