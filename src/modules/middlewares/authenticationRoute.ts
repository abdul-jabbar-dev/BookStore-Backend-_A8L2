import { ROLE } from "@prisma/client";
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../../db";

const authenticationRoute =
  (role: ROLE[]): RequestHandler =>
  async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && typeof token === "undefined") {
      next(new Error("Token must be provided"));
    }
    if (token && token.includes("Bearer")) {
      token = token.split(" ")[1];
    }
    if (!token) {
      next(new Error("Token must be provided"));
    }

    try {
      const decoded: JwtPayload | string = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      );

      if (typeof decoded === "string") {
        next(new Error("Invalid Token"));
      } else {
        if (decoded.role === "admin") {
          decoded.role = "Admin";
        } else if (decoded.role === "customer") {
          decoded.role = "Customer";
        }
        if (role?.includes(decoded.role)) {
          const user = await db.user.findUnique({ where: { id: decoded.id } });
          if (!user) {
            next(new Error("Invalid Token"));
          } else {
            req.user = user;
            next();
          }
        } else {
          next(new Error("Unauthorized user"));
        }
      }
    } catch (error) {
      next(error);
    }
  };
export default authenticationRoute;
