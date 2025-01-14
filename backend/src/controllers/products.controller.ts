import { uploadImage } from "@store/lib/files/upload-image";
import { IdParamSchema } from "@store/lib/validators/model.schemas";
import {
  CreateProductRequestBodySchema,
  EditProductDataSchema,
  ListProductsRequestBodySchema,
} from "@store/lib/validators/product.schemas";
import { ProductCategory } from "@store/models/product-category.model";
import { Product } from "@store/models/product.model";
import type { Request, Response } from "express";
import { ZodError } from "zod";

export const ProductsController = {
  async getProduct(request: Request, response: Response) {
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
  },

  async createProduct(request: Request, response: Response) {
    try {
      const { name, categoryId, ...restProductProps } =
        CreateProductRequestBodySchema.parse(request.body);

      const categoryExists = await ProductCategory.findByPk(categoryId);

      if (!categoryExists) {
        response
          .status(404)
          .send({ success: false, error: "Product category not found." });
        return;
      }

      const productAlreadyExists = await Product.findOne({ where: { name } });

      if (productAlreadyExists) {
        response
          .status(400)
          .send({ success: false, error: "Product already exists." });
        return;
      }

      const picture = await uploadImage(request?.file);

      const newProduct = await Product.create({
        ...restProductProps,
        name,
        categoryId,
        picture: picture.secure_url,
      });

      response.send({ success: true, data: newProduct });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async updateProduct(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);
      const productUpdatePayload = EditProductDataSchema.parse(request.body);

      const product = await Product.findByPk(id);

      if (!product) {
        response
          .status(404)
          .send({ success: false, error: "Product not found." });
        return;
      }

      let picture = product.picture;

      if (request.file) {
        const image = await uploadImage(request?.file);
        picture = image.secure_url;
      }

      await Product.update(
        { ...productUpdatePayload, picture },
        { where: { id } }
      );

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async listProducts(request: Request, response: Response) {
    try {
      const { limit, offset, ...filters } = ListProductsRequestBodySchema.parse(
        request.query
      );

      const { count, rows } = await Product.findAndCountAll({
        where: {
          ...filters,
        },
        limit,
        offset,
        include: [
          {
            model: ProductCategory,
            attributes: ["id", "name"],
          },
        ],
      });

      response.send({ success: true, data: { count, items: rows } });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },

  async deleteProduct(request: Request, response: Response) {
    try {
      const id = IdParamSchema.parse(request.params.id);

      const product = await Product.findByPk(id);

      if (!product) {
        response
          .status(404)
          .send({ success: false, error: "Product not found." });
        return;
      }

      await Product.destroy({ where: { id } });

      response.send({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        const errorDetails =
          error instanceof ZodError ? error.flatten() : error.message;

        response.status(400).send({ success: false, error: errorDetails });
      }
    }
  },
};
