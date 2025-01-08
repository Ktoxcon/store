import { DeliveryStatus } from "@store/lib/constants/delivery-status";
import { OrderStatus } from "@store/lib/constants/order-status";
import { db } from "@store/lib/db";
import { RestoreProductStock } from "@store/lib/db/hooks/order.hooks";
import { DataTypes, Model } from "sequelize";

export class Order extends Model {
  declare id: number;
  declare total: number;
  declare status: string;
  declare deliveryStatus: string;
}

Order.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.FLOAT,
    },
    deliveryStatus: {
      type: DataTypes.ENUM,
      values: Object.values(DeliveryStatus),
      defaultValue: DeliveryStatus.PENDING,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(OrderStatus),
      defaultValue: DeliveryStatus.PENDING,
    },
  },
  {
    sequelize: db,
    paranoid: true,
    tableName: "Orders",
    hooks: { afterUpdate: RestoreProductStock },
  }
);
