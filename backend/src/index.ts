import AppConfig from "./config/app.config";
import { app } from "./routes/main.routes";

app.listen(AppConfig.port, () => {
  console.info(`Server listening in port: ${AppConfig.port}`);
});
