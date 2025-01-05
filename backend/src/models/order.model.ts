import { db } from "@store/lib/db";
import { DataTypes, Model } from "sequelize";

export class Order extends Model {
  declare id: number;
  declare confirmed: boolean;
  declare cancelled: boolean;
  declare confirmedAt: Date;
  declare cancelledAt: Date;
}

Order.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    confirmed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancelled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmedAt: {
      type: DataTypes.DATE,
    },
    cancelledAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    paranoid: true,
    tableName: "Orders",
  }
);
