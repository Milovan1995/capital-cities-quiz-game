import { expressjwt } from "express-jwt";
import { appConfig } from "../config.js";

const authMiddleware = expressjwt({
  secret: appConfig.jwtSecret,
  algorithms: ["HS256"],
});

export default authMiddleware;
