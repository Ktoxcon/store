import { OrderItem } from "@store/models/order-item.model";
import { Product } from "@store/models/product.model";

export async function VerifyProductStock(items: OrderItem[]) {
  await Promise.all(
    items.map(async (item) => {
      const product = await Product.findByPk(item.productId);

      if (!product) throw new Error("Product not found");

      const newStock = product.quantity - item.quantity;

      if (product.quantity === 0 || newStock < 0) {
        throw new Error("Product stock unavailable");
      }

      await Product.update(
        { quantity: newStock },
        { where: { id: product.id } }
      );
    })
  );
}
