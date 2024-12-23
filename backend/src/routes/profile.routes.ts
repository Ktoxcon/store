import { UsersController } from "@store/controllers/users.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import express from "express";

export const ProfileRoutes = express();

ProfileRoutes.get("/profile/:id", AuthMiddleware, UsersController.getUser);
ProfileRoutes.patch("/profile", AuthMiddleware, UsersController.updateUser);
