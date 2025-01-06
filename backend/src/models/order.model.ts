import { DeliveryStatus } from "@store/lib/constants/delivery-status";
import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class Order extends Model {
  declare id: number;
  declare total: number;
  declare confirmed: boolean;
  declare cancelled: boolean;
  declare confirmedAt: Date;
  declare cancelledAt: Date;
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
    confirmed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancelled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmedAt: {
      type: DataTypes.DATE,
    },
    cancelledAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    paranoid: true,
    tableName: "Orders",
  }
);
