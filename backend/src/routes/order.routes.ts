import { OrdersController } from "@store/controllers/orders.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import express from "express";

export const OrderRoutes = express();

OrderRoutes.get("/orders/:id", AuthMiddleware, OrdersController.getOrder);
OrderRoutes.post(
  "/orders",
  AuthMiddleware,
  CustomerMiddleware,
  OrdersController.createOrder
);
OrderRoutes.patch(
  "/orders/:id/cancellation",
  AuthMiddleware,
  CustomerMiddleware,
  OrdersController.cancelOrder
);
OrderRoutes.patch(
  "/orders/:id/confirmation",
  AuthMiddleware,
  AdminMiddleware,
  OrdersController.updateOrderConfirmationStatus
);
OrderRoutes.get("/orders", AuthMiddleware, OrdersController.listOrders);
