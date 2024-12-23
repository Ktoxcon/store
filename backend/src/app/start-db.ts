import { db } from "../lib/db";
import { createModelAssociations } from "../models/associations";

export async function startDB() {
  await db.authenticate();

  createModelAssociations();

  await db.sync();
}
