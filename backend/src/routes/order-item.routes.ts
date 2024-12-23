import { OrderItemsController } from "@store/controllers/order-items.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import express from "express";

export const OrderItemRoutes = express();

OrderItemRoutes.post(
  "/order-item",
  AuthMiddleware,
  CustomerMiddleware,
  OrderItemsController.addOrderItems
);
OrderItemRoutes.post(
  "/order-item/:id",
  AuthMiddleware,
  CustomerMiddleware,
  OrderItemsController.removeOrderItem
);
