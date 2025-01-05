declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    COOKIES_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_SYNC_FORCE: boolean;
    APP_URL: string;
  }
}
