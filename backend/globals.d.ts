declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    COOKIES_SECRET: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
  }
}
