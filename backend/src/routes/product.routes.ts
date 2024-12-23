import { ProductsController } from "@store/controllers/products.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { FileUploadMiddleware } from "@store/middleware/file-upload.middleware";
import express from "express";

export const ProductRoutes = express();

ProductRoutes.get(
  "/product/:id",
  AuthMiddleware,
  ProductsController.getProduct
);
ProductRoutes.post(
  "/product",
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.createProduct
);
ProductRoutes.post(
  "/product/:id",
  AuthMiddleware,
  AdminMiddleware,
  FileUploadMiddleware,
  ProductsController.addProductPicture
);
ProductRoutes.patch(
  "/product/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.updateProduct
);
ProductRoutes.get("/product", AuthMiddleware, ProductsController.listProducts);
