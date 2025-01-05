import { UsersController } from "@store/controllers/users.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const ProfileRoutes = Router();

ProfileRoutes.use(UrlEncodedMiddleware);

ProfileRoutes.get("/:id", AuthMiddleware, UsersController.getUser);
ProfileRoutes.patch("/", AuthMiddleware, UsersController.updateUser);
