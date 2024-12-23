import { OrdersController } from "@store/controllers/orders.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import express from "express";

export const OrderRoutes = express();

OrderRoutes.get("/order/:id", AuthMiddleware, OrdersController.getOrder);
OrderRoutes.post(
  "/order",
  AuthMiddleware,
  CustomerMiddleware,
  OrdersController.createOrder
);
OrderRoutes.patch(
  "/order/:id/cancellation",
  AuthMiddleware,
  CustomerMiddleware,
  OrdersController.cancellOrder
);
OrderRoutes.patch(
  "/order/:id/confirmation",
  AuthMiddleware,
  AdminMiddleware,
  OrdersController.updateOrderConfirmationStatus
);
OrderRoutes.get("/order", AuthMiddleware, OrdersController.listOrders);
