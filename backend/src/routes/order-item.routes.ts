import { OrderItemsController } from "@store/controllers/order-items.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import express from "express";

export const OrderItemRoutes = express();

OrderItemRoutes.delete(
  "/order-items/:id",
  AuthMiddleware,
  CustomerMiddleware,
  OrderItemsController.removeOrderItem
);
OrderItemRoutes.patch(
  "/order-items/:id",
  AuthMiddleware,
  CustomerMiddleware,
  OrderItemsController.updateOrderItem
);
