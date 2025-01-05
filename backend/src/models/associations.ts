import { Address } from "./address.model";
import { OrderItem } from "./order-item.model";
import { Order } from "./order.model";
import { ProductCategory } from "./product-category.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export function createModelAssociations() {
  User.hasMany(Order, { foreignKey: "userId" });
  User.hasMany(Address, { foreignKey: "userId" });

  Order.belongsTo(User, { foreignKey: "userId" });
  Order.hasMany(OrderItem, { foreignKey: "orderId" });

  Address.belongsTo(User, { foreignKey: "userId" });
  Address.hasMany(Order, { foreignKey: "addressId" });

  OrderItem.belongsTo(Order, { foreignKey: "orderId" });
  OrderItem.belongsTo(Product, { foreignKey: "productId" });

  ProductCategory.hasMany(Product, {
    onDelete: "CASCADE",
    foreignKey: "categoryId",
  });

  Product.belongsTo(ProductCategory, { foreignKey: "categoryId" });
  Product.hasMany(OrderItem, { foreignKey: "productId" });
}
