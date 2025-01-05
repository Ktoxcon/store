import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { UserRoutes } from "@store/routes//user.routes";
import { AddressRoutes } from "@store/routes/address.routes";
import { AuthRoutes } from "@store/routes/auth.routes";
import { OrderRoutes } from "@store/routes/order.routes";
import { ProductCategoryRoutes } from "@store/routes/product-category.routes";
import { ProductRoutes } from "@store/routes/product.routes";
import { ProfileRoutes } from "@store/routes/profile.routes";

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/users", UserRoutes);
app.use("/orders", OrderRoutes);
app.use("/profile", ProfileRoutes);
app.use("/products", ProductRoutes);
app.use("/addresses", AddressRoutes);
app.use("/categories", ProductCategoryRoutes);
app.use("/auth", AuthRoutes);
