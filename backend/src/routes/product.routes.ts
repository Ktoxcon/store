import { ProductsController } from "@store/controllers/products.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { FormDataMiddleware } from "@store/middleware/form-data.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const ProductRoutes = Router();

ProductRoutes.get(
  "/",
  UrlEncodedMiddleware,
  AuthMiddleware,
  ProductsController.listProducts
);
ProductRoutes.get(
  "/:id",
  UrlEncodedMiddleware,
  AuthMiddleware,
  ProductsController.getProduct
);
ProductRoutes.post(
  "/",
  FormDataMiddleware,
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.createProduct
);
ProductRoutes.patch(
  "/:id",
  FormDataMiddleware,
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.updateProduct
);
ProductRoutes.delete(
  "/:id",
  UrlEncodedMiddleware,
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.deleteProduct
);
