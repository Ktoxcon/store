import { db } from "@store/lib/db";
import { afterUpdate } from "@store/lib/db/hooks/category.hooks";
import { DataTypes, Model } from "sequelize";
import { Product } from "./product.model";

export class ProductCategory extends Model {
  declare id: number;
  declare name: string;
  declare active: boolean;
  declare deletedAt?: string;
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
    paranoid: true,
    tableName: "ProductCategories",
    hooks: {
      afterDestroy(instance) {
        Product.destroy({ where: { categoryId: instance.id } });
      },
      afterUpdate,
    },
  }
);
