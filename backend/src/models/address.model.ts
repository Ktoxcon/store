import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class Address extends Model {
  declare id: number;
  declare name: string;
  declare recipient: string;
  declare phone: string;
  declare addressLine: string;
  declare secondAddressLine?: string;
  declare department: string;
  declare township: string;
  declare userId: string;
}

Address.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    recipient: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    addressLine: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    secondAddressLine: {
      type: DataTypes.STRING,
    },
    department: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    township: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    paranoid: true,
    tableName: "Addresses",
  }
);
