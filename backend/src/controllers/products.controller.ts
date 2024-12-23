import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  CreateProductRequestBodySchema,
  ListProductsRequestBodySchema,
  OptionalProductDataSchema,
} from "@store/lib/validators/product.schemas";
import { ProductCategory } from "@store/models/product-category.model";
import { Product } from "@store/models/product.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export class ProductsController {
  static async getProduct(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const product = await Product.findByPk(id);

      if (!product) {
        response
          .status(404)
          .send({ success: false, error: "Product not found." });
        return;
      }

      response.send({ success: true, data: product });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async createProduct(request: Request, response: Response) {
    try {
      const { name, category, ...restProductProps } =
        CreateProductRequestBodySchema.parse(request.body);

      const productAlreadyExists = await Product.findOne({ where: { name } });

      if (productAlreadyExists) {
        response
          .status(400)
          .send({ success: false, error: "Product already exists." });
        return;
      }

      const categoryExists = await ProductCategory.findByPk(category);

      if (!categoryExists) {
        response
          .status(404)
          .send({ success: false, error: "Product category not found." });
        return;
      }

      const newProduct = await Product.create({
        ...restProductProps,
        name,
        ProductCategoryId: category,
      });

      response.send({ success: true, data: newProduct });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async updateProduct(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const productUpdatePayload = OptionalProductDataSchema.parse(
        request.body
      );

      const product = await Product.findByPk(id);

      if (!product) {
        response
          .status(404)
          .send({ success: false, error: "Product not found." });
        return;
      }

      await Product.update(productUpdatePayload, { where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }

  static async listProducts(request: Request, response: Response) {
    try {
      const { limit, offset, ...filters } = ListProductsRequestBodySchema.parse(
        request.body
      );

      const { count, rows } = await Product.findAndCountAll({
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

  static async addProductPicture(request: Request, response: Response) {
    try {
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  }
}
