import { OrdersController } from "@store/controllers/orders.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const OrderRoutes = Router();

OrderRoutes.use(UrlEncodedMiddleware);

OrderRoutes.get("/", AuthMiddleware, OrdersController.listOrders);
OrderRoutes.get("/:id", AuthMiddleware, OrdersController.getOrder);
OrderRoutes.post(
  "/",
  AuthMiddleware,
  CustomerMiddleware,
  OrdersController.createOrder
);
OrderRoutes.patch(
  "/:id/cancellation",
  AuthMiddleware,
  CustomerMiddleware,
  OrdersController.cancelOrder
);
OrderRoutes.patch(
  "/:id/confirmation",
  AuthMiddleware,
  AdminMiddleware,
  OrdersController.updateOrderConfirmationStatus
);
