import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  CreateOrderItemRequestBodySchema,
  UpdateOrderItemRequestBodySchema,
} from "@store/lib/validators/order-item.schemas";
import { OrderItem } from "@store/models/order-item.model";
import { Order } from "@store/models/order.model";
import { Product } from "@store/models/product.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class OrderItemsController {
  static async addOrderItems(request: Request, response: Response) {
    try {
      const { orderId, productId, quantity } =
        CreateOrderItemRequestBodySchema.parse(request.body);

      const orderExists = await Order.findByPk(orderId);

      if (!orderExists) {
        response
          .status(404)
          .send({ success: false, error: "Order not found." });
        return;
      }

      const product = await Product.findByPk(productId);

      if (!product) {
        response
          .status(404)
          .send({ success: false, error: "Product not found." });
        return;
      }

      if (quantity > product.quantity) {
        response.status(400).send({
          success: false,
          error: "Requested quantity exceeds available stock.",
        });
        return;
      }

      const newOrderItem = await OrderItem.create({
        quantity,
        OrderId: orderId,
        ProductId: productId,
      });

      response.send({ success: true, data: newOrderItem });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateOrderItem(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const { quantity } = UpdateOrderItemRequestBodySchema.parse(request.body);

      const orderItem = await OrderItem.findByPk(id);

      if (!orderItem) {
        response
          .status(404)
          .send({ success: false, error: "Order item not found." });
        return;
      }

      const product = await Product.findByPk(orderItem.productId);

      if (!product) {
        response
          .status(404)
          .send({ success: false, error: "Product not found." });
        return;
      }

      if (quantity > product.quantity) {
        response.status(400).send({
          success: false,
          error: "Requested quantity exceeds available stock.",
        });
        return;
      }

      await OrderItem.update({ quantity }, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async removeOrderItem(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const orderItem = await OrderItem.findByPk(id);

      if (!orderItem) {
        response
          .status(404)
          .send({ success: false, error: "Order item not found." });
        return;
      }

      await OrderItem.destroy({ where: { id } });

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
