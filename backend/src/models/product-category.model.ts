import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class ProductCategory extends Model {}

ProductCategory.init(
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
