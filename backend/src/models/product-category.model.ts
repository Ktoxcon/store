import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class ProductCategory extends Model {
  declare id: number;
  declare name: string;
  declare active: boolean;
}

ProductCategory.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: "ProductCategories",
  }
);
