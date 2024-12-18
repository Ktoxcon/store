import { DataTypes, Model } from "sequelize";
import { db } from "../lib/db";

export class UserRole extends Model {}

UserRole.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "UserRoles",
  }
);
