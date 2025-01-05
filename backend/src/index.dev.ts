import "dotenv/config";

import { start } from "@store/app/start";
import { createRootUser } from "./lib/db/create-root";

start();
createRootUser();
