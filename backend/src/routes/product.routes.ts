import { ProductsController } from "@store/controllers/products.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import express from "express";

export const ProductRoutes = express.Router();

ProductRoutes.get(
  "/products/:id",
  AuthMiddleware,
  ProductsController.getProduct
);
ProductRoutes.post(
  "/products",
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.createProduct
);
ProductRoutes.patch(
  "/products/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.updateProduct
);
ProductRoutes.get("/products", AuthMiddleware, ProductsController.listProducts);
ProductRoutes.delete(
  "/products/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.deleteProduct
);
