import { ProductCategoriesController } from "@store/controllers/product-categories.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import express from "express";

export const ProductCategoryRoutes = express();

ProductCategoryRoutes.get(
  "/category/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.getCategory
);
ProductCategoryRoutes.post(
  "/category",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.createCategory
);
ProductCategoryRoutes.patch(
  "/category/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.updateCategory
);
ProductCategoryRoutes.get(
  "/category",
  AuthMiddleware,
  ProductCategoriesController.listCategories
);
