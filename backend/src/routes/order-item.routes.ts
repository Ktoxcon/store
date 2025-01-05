import { OrderItemsController } from "@store/controllers/order-items.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const OrderItemRoutes = Router();

OrderItemRoutes.use(UrlEncodedMiddleware);

OrderItemRoutes.delete(
  "/:id",
  AuthMiddleware,
  CustomerMiddleware,
  OrderItemsController.removeOrderItem
);
OrderItemRoutes.patch(
  "/:id",
  AuthMiddleware,
  CustomerMiddleware,
  OrderItemsController.updateOrderItem
);
