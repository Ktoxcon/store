import { UsersController } from "@store/controllers/users.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import express from "express";

export const UserRoutes = express();

UserRoutes.get(
  "/user/:id",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.getUser
);
UserRoutes.post(
  "/user",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.createUser
);
UserRoutes.patch(
  "/user",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.updateUser
);
UserRoutes.get(
  "/user",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.listUsers
);
