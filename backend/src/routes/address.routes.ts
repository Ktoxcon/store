import { AddressesController } from "@store/controllers/addresses.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import express from "express";

export const AddressRoutes = express();

AddressRoutes.get(
  "/address/:id",
  AuthMiddleware,
  AddressesController.getAddress
);
AddressRoutes.post(
  "/address",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.createAddress
);
AddressRoutes.patch(
  "/address/:id",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.updateAddress
);
AddressRoutes.get(
  "/address",
  AuthMiddleware,
  AddressesController.listAddresses
);
AddressRoutes.delete(
  "/address/:id",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.listAddresses
);
