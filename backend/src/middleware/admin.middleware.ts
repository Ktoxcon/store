import { UserRoles } from "@store/constants/roles";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export function AdminMiddleware(
  _request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const session: JwtPayload = response.locals.session;

    if (session.data.userRole !== UserRoles.ADMIN) {
      response.status(403).send({ success: false, error: "Forbidden" });
      return;
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      response.status(403).send({ success: false, error: error.message });
    }
  }
}
