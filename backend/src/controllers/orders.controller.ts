import { db } from "@store/lib/db";
import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  CreateOrderRequestBodySchema,
  ListOrdersRequestBodySchema,
  UpdateOrderRequestBodySchema,
} from "@store/lib/validators/order.schemas";
import { Address } from "@store/models/address.model";
import { OrderItem } from "@store/models/order-item.model";
import { Order } from "@store/models/order.model";
import { Product } from "@store/models/product.model";
import { User } from "@store/models/user.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export const OrdersController = {
  async getOrder(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const order = await Order.findByPk(id, {
        include: [
          { model: Address },
          { model: OrderItem, include: [{ model: Product }] },
        ],
      });

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
  },

  async createOrder(request: Request, response: Response) {
    const transaction = await db.transaction();
    try {
      const { userId, addressId, items } = CreateOrderRequestBodySchema.parse(
        request.body
      );

      const userExists = await User.findByPk(userId, { transaction });

      if (!userExists) {
        response.status(404).send({ success: false, error: "User not found." });
        return;
      }

      const addressExists = await Address.findOne({
        where: {
          userId,
          id: addressId,
        },
      });

      if (!addressExists) {
        response
          .status(404)
          .send({ success: false, error: "Address not found." });
        return;
      }

      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const order = await Order.create(
        {
          total,
          userId,
          addressId,
        },
        { transaction }
      );

      const orderItems = items.map((item) => {
        return { ...item, orderId: order.id };
      });

      await OrderItem.bulkCreate(orderItems, { transaction, hooks: true });

      await transaction.commit();

      response.send({ success: true, data: order });
    } catch (error) {
      await transaction.rollback();

      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async updateOrder(request: Request, response: Response) {
    const transaction = await db.transaction();
    try {
      const id = IdParamSchema.parse(request.params.id);

      const { addressId, ...restUploadPayload } =
        UpdateOrderRequestBodySchema.parse(request.body);

      const order = await Order.findByPk(id, { transaction });

      if (!order) {
        response
          .status(404)
          .send({ success: false, error: "Order not found." });
        return;
      }

      if (addressId) {
        const addressExists = await Address.findByPk(addressId, {
          transaction,
        });

        if (!addressExists) {
          response
            .status(404)
            .send({ success: false, error: "Address not found." });
          return;
        }
      }

      await Order.update(
        { addressId, ...restUploadPayload },
        { where: { id }, transaction, individualHooks: true }
      );

      await transaction.commit();

      response.send({ success: true });
    } catch (error) {
      await transaction.rollback();

      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async listOrders(request: Request, response: Response) {
    const transaction = await db.transaction();
    try {
      const { limit, offset, ...params } = ListOrdersRequestBodySchema.parse(
        request.query
      );

      const { count, rows } = await Order.findAndCountAll({
        where: {
          ...params,
        },
        limit,
        offset,
        transaction,
      });

      await transaction.commit();

      response.send({ success: true, data: { count, items: rows } });
    } catch (error) {
      await transaction.rollback();

      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },
};
