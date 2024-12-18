import "dotenv/config";
import AppConfig from "./config/app.config";
import { db } from "./lib/db";
import { app } from "./routes/main.routes";

db.authenticate().then(async () => {
  await db.sync({ force: true });

  app.listen(AppConfig.port, async () => {
    console.info(`Server listening in port: ${AppConfig.port}`);
  });
});
