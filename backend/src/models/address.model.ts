import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class Address extends Model {}

Address.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "ProductCategories",
  }
);
