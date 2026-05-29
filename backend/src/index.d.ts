import { IAuthTokenPayload } from "./dao/ITables.js";

declare module "express-serve-static-core" {
  interface Request {
    auth?: IAuthTokenPayload;
  }
}

declare module "body-parser";

export {};
