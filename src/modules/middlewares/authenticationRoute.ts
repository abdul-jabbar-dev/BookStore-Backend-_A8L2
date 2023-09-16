import { ROLE } from "@prisma/client";
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../../db";

const authenticationRoute =
  (role: ROLE[]): RequestHandler =>
  async (req, res, next) => {
    const bearer_token = req.headers.authorization;
    if (!bearer_token) {
      next(new Error("Token must be provided"));
    }
    const token = bearer_token?.split(" ")[1];
    try {
      const decoded: JwtPayload | string = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      );
      if (typeof decoded === "string") {
        next(new Error("Invalid Token"));
      } else {
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
