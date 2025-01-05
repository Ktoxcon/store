import { createRootUser } from "@store/lib/db/create-root";
import { start } from "repl";

export async function startDev() {
  await start();
  await createRootUser();
}
