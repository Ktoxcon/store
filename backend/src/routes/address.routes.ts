import { AddressesController } from "@store/controllers/addresses.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import express from "express";

export const AddressRoutes = express();

AddressRoutes.get(
  "/addresses/:id",
  AuthMiddleware,
  AddressesController.getAddress
);
AddressRoutes.post(
  "/addresses",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.createAddress
);
AddressRoutes.patch(
  "/addresses/:id",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.updateAddress
);
AddressRoutes.get(
  "/addresses",
  AuthMiddleware,
  AddressesController.listAddresses
);
AddressRoutes.delete(
  "/addresses/:id",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.listAddresses
);
