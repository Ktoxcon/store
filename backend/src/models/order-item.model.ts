import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "OrderItems",
  }
);
