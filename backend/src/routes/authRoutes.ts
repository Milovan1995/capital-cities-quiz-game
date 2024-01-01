import express from "express";

import authControllers from "../controllers/authControllers.js";

const authRoutes = express.Router();
authRoutes.get("/check-username", authControllers.checkUsernameExistence);
authRoutes.post("/register-user", authControllers.registerNewUser);
authRoutes.post("/verify-user", authControllers.checkIfUserValid);

export { authRoutes };
