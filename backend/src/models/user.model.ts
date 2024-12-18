import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "Users",
  }
);
