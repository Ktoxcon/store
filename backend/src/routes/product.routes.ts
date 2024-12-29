import { ProductsController } from "@store/controllers/products.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { FileUploadMiddleware } from "@store/middleware/file-upload.middleware";
import express from "express";

export const ProductRoutes = express();

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
ProductRoutes.post(
  "/products/:id",
  AuthMiddleware,
  AdminMiddleware,
  FileUploadMiddleware,
  ProductsController.addProductPicture
);
ProductRoutes.patch(
  "/products/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductsController.updateProduct
);
ProductRoutes.get("/products", AuthMiddleware, ProductsController.listProducts);
