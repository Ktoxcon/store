import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "mssql",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
