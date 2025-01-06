import { AddressesController } from "@store/controllers/addresses.controller";
import { AuthMiddleware } from "@store/middleware/auth.middleware";
import { CustomerMiddleware } from "@store/middleware/customer.middleware";
import { UrlEncodedMiddleware } from "@store/middleware/url-encoded.middleware";
import { Router } from "express";

export const AddressRoutes = Router();

AddressRoutes.use(UrlEncodedMiddleware);

AddressRoutes.get("/:id", AuthMiddleware, AddressesController.getAddress);
AddressRoutes.get("/", AuthMiddleware, AddressesController.listAddresses);
AddressRoutes.post(
  "/",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.createAddress
);
AddressRoutes.patch(
  "/:id",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.updateAddress
);
AddressRoutes.delete(
  "/:id",
  AuthMiddleware,
  CustomerMiddleware,
  AddressesController.deleteAddress
);
