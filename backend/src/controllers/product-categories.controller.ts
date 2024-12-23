import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  CreateCategoryRequestBodySchema,
  ListCategoriesRequestBodySchema,
  OptionalCategoryDataSchema,
} from "@store/lib/validators/product-categories.schemas";
import { ProductCategory } from "@store/models/product-category.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class ProductCategoriesController {
  static async getCategory(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const category = await ProductCategory.findByPk(id);

      if (!category) {
        response
          .status(404)
          .send({ success: false, error: "Product category not found." });
        return;
      }

      response.send({ success: true, data: category });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async createCategory(request: Request, response: Response) {
    try {
      const { name } = CreateCategoryRequestBodySchema.parse(request.body);

      const categoryAlreadyExists = await ProductCategory.findOne({
        where: { name },
      });

      if (categoryAlreadyExists) {
        response
          .status(400)
          .send({ success: false, error: "Product category already exists." });
        return;
      }

      const newCategory = await ProductCategory.create({ name });

      response.send({ success: true, data: newCategory });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateCategory(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const categoryUpdatePayload = OptionalCategoryDataSchema.parse(
        request.body
      );

      const category = await ProductCategory.findByPk(id);

      if (!category) {
        response
          .status(404)
          .send({ success: false, error: "Product category not found." });
        return;
      }

      await ProductCategory.update(categoryUpdatePayload, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async listCategories(request: Request, response: Response) {
    try {
      const { limit, offset, ...filters } =
        ListCategoriesRequestBodySchema.parse(request.body);

      const { count, rows } = await ProductCategory.findAndCountAll({
        where: {
          ...filters,
        },
        limit,
        offset,
      });

      response.send({ success: true, data: { count, items: rows } });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }
}
