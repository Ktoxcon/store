import express from "express";
import { AccountRoutes } from "./account.routes";
import { AddressRoutes } from "./address.routes";
import { AuthRoutes } from "./auth.routes";
import { CategoryRoutes } from "./category.routes";
import { OrderItemRoutes } from "./order-item.routes";
import { OrderRoutes } from "./order.routes";
import { ProductRoutes } from "./product.routes";
import { UserRoleRoutes } from "./user-role.routes";

export const app = express();

app.use("/auth", AuthRoutes);
app.use("/role", UserRoleRoutes);
app.use("/account", AccountRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", ProductRoutes);
app.use("/order", OrderRoutes);
app.use("/order-item", OrderItemRoutes);
app.use("/address", AddressRoutes);
