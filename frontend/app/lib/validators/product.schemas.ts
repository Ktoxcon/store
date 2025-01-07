import { z } from "zod";

export const ProductPriceFieldSchema = z
  .string()
  .nonempty({ message: "Product price is required." })
  .transform((priceString) => {
    const price = Number(priceString);

    return Number.isNaN(price) ? 0 : price;
  });

export const ProductStockFieldSchema = z
  .string()
  .nonempty({ message: "Product stock is required." })
  .transform((stockStrging) => {
    const stock = Number(stockStrging);

    return Number.isNaN(stock) ? 0 : stock;
  });

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

export const EditProductFormSchema = CreateProductFormSchema.omit({
  picture: true,
})
  .extend({
    picture: ProductImageSchema.innerType(),
  })
  .partial();
