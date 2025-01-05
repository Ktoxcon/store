import { UsersController } from "@store/controllers/users.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const UserRoutes = Router();

UserRoutes.use(UrlEncodedMiddleware);

UserRoutes.get(
  "/:id",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.getUser
);
UserRoutes.post(
  "/",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.createUser
);
UserRoutes.patch(
  "/:id",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.updateUser
);
UserRoutes.get("/", AuthMiddleware, AdminMiddleware, UsersController.listUsers);
