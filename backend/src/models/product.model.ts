import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class Product extends Model {}

Product.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "Products",
  }
);
