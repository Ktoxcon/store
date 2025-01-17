import { UserRoles } from "@store/lib/constants/roles";
import { UserStatus } from "@store/lib/constants/user-status";
import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class User extends Model {
  declare id: number;
  declare role: string;
  declare name: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare picture?: string;
  declare phone?: string;
  declare stauts: string;
}

User.init(
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
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    userRole: {
      type: DataTypes.ENUM,
      values: Object.values(UserRoles),
      defaultValue: UserRoles.CUSTOMER,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(UserStatus),
    },
  },
  {
    sequelize: db,
    tableName: "Users",
  }
);
