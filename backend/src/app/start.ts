import AppConfig from "@store/config/app.config";
import { app } from "./main";
import { startDB } from "./start-db";

export async function start() {
  try {
    await startDB();

    app.listen(AppConfig.port, () => {
      console.info(`Server listening in port: ${AppConfig.port}`);
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
}
