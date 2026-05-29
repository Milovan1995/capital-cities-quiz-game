import { expressjwt } from "express-jwt";

const authMiddleware = expressjwt({
  secret: "SECRET",
  algorithms: ["HS256"],
});

export default authMiddleware;
