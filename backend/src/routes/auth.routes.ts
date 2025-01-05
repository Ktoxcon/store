import express from "express";

import { AuthController } from "@store/controllers/auth.controller";

export const AuthRoutes = express();

AuthRoutes.post("/signin", AuthController.signIn);
AuthRoutes.post("/signup", AuthController.signUp);
AuthRoutes.post("/signout", AuthController.signOut);
AuthRoutes.post("/reset-password", AuthController.resetPassword);
AuthRoutes.post("/forgot-password", AuthController.recoverAccount);
