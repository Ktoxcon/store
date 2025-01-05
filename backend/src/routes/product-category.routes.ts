import { ProductCategoriesController } from "@store/controllers/product-categories.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const ProductCategoryRoutes = Router();

ProductCategoryRoutes.use(UrlEncodedMiddleware);

ProductCategoryRoutes.get(
  "/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.getCategory
);
ProductCategoryRoutes.post(
  "/",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.createCategory
);
ProductCategoryRoutes.patch(
  "/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.updateCategory
);
ProductCategoryRoutes.delete(
  "/:id",
  AuthMiddleware,
  AdminMiddleware,
  ProductCategoriesController.deleteCategory
);
ProductCategoryRoutes.get(
  "/",
  AuthMiddleware,
  ProductCategoriesController.listCategories
);
