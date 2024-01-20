import express from "express";

import authControllers from "../controllers/authControllers.js";

const authRoutes = express.Router();
authRoutes.get("/check-username", authControllers.checkUsernameExistence);
authRoutes.post("/register", authControllers.registerNewUser);
authRoutes.post("/login", authControllers.checkIfUserValid);

export { authRoutes };
