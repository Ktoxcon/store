import { OrderStatus } from "@store/lib/constants/order-status";
import { OrderItem } from "@store/models/order-item.model";
import { Order } from "@store/models/order.model";
import { Product } from "@store/models/product.model";

export async function RestoreProductStock(order: Order) {
  if (order.status === OrderStatus.CONFIRMED) {
    return;
  }

  const items = await OrderItem.findAll({
    where: { orderId: order.id },
    include: [{ model: Product }],
  });

  await Promise.all(
    items.map(async (item) => {
      const { Product } = item as any;
      const newStock = item.quantity + Product.quantity;

      await Product.update(
        { quantity: newStock },
        { where: { id: item.productId } }
      );
    })
  );
}
