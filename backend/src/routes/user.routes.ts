import { UsersController } from "@store/controllers/users.controller";
import { AdminMiddleware } from "@store/middleware/admin.middleware";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import express from "express";

export const UserRoutes = express();

UserRoutes.get(
  "/users/:id",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.getUser
);
UserRoutes.post(
  "/users",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.createUser
);
UserRoutes.patch(
  "/users/:id",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.updateUser
);
UserRoutes.get(
  "/users",
  AuthMiddleware,
  AdminMiddleware,
  UsersController.listUsers
);
