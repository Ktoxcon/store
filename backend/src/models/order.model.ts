import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class Order extends Model {}

Order.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "Orders",
  }
);
