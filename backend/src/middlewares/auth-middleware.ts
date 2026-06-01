import { expressjwt } from "express-jwt";

const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET";

const authMiddleware = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
});

export default authMiddleware;