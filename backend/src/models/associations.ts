import { Address } from "./address.model";
import { OrderItem } from "./order-item.model";
import { Order } from "./order.model";
import { ProductCategory } from "./product-category.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export function createModelAssociations() {
  User.hasMany(Order);
  User.hasMany(Address);

  Order.belongsTo(User);
  Order.hasMany(OrderItem);

  Address.belongsTo(User);
  Address.hasMany(Order);

  OrderItem.belongsTo(Order);
  OrderItem.belongsTo(Product);

  ProductCategory.hasMany(Product);

  Product.belongsTo(ProductCategory);
  Product.hasMany(OrderItem);
}
