import express from "express";

import authControllers from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/verify-user", authControllers.checkIfUserValid);

export { authRoutes };
