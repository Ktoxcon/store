import AppConfig from "@store/config/app.config";
import { v2 as cloudinary } from "cloudinary";
import { app } from "./main";
import { startDB } from "./start-db";

export async function start() {
  try {
    await startDB();

    app.listen(AppConfig.port, () => {
      cloudinary.config({
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      });

      console.info(`Server listening in port: ${AppConfig.port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
}
