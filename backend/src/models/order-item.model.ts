import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class OrderItem extends Model {
  declare id: number;
  declare quantity: number;
  declare unitPrice: number;
  declare orderId: string;
  declare productId: string;
}

OrderItem.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    unitPrice: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize: db,
    tableName: "OrderItems",
  }
);
