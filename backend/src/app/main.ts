import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

import { UserRoutes } from "@store/routes//user.routes";
import { AddressRoutes } from "@store/routes/address.routes";
import { AuthRoutes } from "@store/routes/auth.routes";
import { OrderItemRoutes } from "@store/routes/order-item.routes";
import { OrderRoutes } from "@store/routes/order.routes";
import { ProductCategoryRoutes } from "@store/routes/product-category.routes";
import { ProductRoutes } from "@store/routes/product.routes";
import { ProfileRoutes } from "@store/routes/profile.routes";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

app.use(UserRoutes);
app.use(OrderRoutes);
app.use(ProfileRoutes);
app.use(ProductRoutes);
app.use(AddressRoutes);
app.use(ProductCategoryRoutes);
app.use(OrderItemRoutes);
app.use("/auth", AuthRoutes);
