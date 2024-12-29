import { ProductCategoriesController } from "@store/controllers/product-categories.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import express from "express";

export const ProductCategoryRoutes = express();

ProductCategoryRoutes.get(
  "/categories/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.getCategory
);
ProductCategoryRoutes.post(
  "/categories",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.createCategory
);
ProductCategoryRoutes.patch(
  "/categories/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.updateCategory
);
ProductCategoryRoutes.get(
  "/categories",
  AuthMiddleware,
  ProductCategoriesController.listCategories
);
