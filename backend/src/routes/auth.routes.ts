import { AuthController } from "@store/controllers/auth.controller";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const AuthRoutes = Router();

AuthRoutes.use(UrlEncodedMiddleware);

AuthRoutes.post("/signin", AuthController.signIn);
AuthRoutes.post("/signup", AuthController.signUp);
AuthRoutes.post("/signout", AuthController.signOut);
AuthRoutes.post("/reset-password", AuthController.resetPassword);
AuthRoutes.post("/forgot-password", AuthController.recoverAccount);
