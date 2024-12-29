import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class Product extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare description: string;
  declare quantity: number;
  declare active?: boolean;
  declare picture?: string;
  declare categoryId: string;
}

Product.init(
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
    price: { allowNull: false, type: DataTypes.FLOAT },
    description: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    picture: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
    tableName: "Products",
  }
);
