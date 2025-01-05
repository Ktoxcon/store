import { z } from "zod";

export const ProductPriceFieldSchema = z
  .string()
  .nonempty({ message: "Product price is required." })
  .refine((priceString) => Number(priceString));

export const ProductStockFieldSchema = z
  .string()
  .nonempty({ message: "Product stock is required." })
  .refine((quantityString) => Number(quantityString));

export const ProductImageSchema = z.any().refine((list) => list?.length > 0, {
  message: "Product image is required.",
});

export const CreateProductFormSchema = z.object({
  name: z.string().nonempty({ message: "Product name is required." }),
  description: z
    .string()
    .nonempty({ message: "Product description name is required." }),
  price: ProductPriceFieldSchema,
  quantity: ProductStockFieldSchema,
  picture: ProductImageSchema,
  categoryId: z.string().nonempty({ message: "Product category is required." }),
});

export const EditProductFormSchema = CreateProductFormSchema.partial();
