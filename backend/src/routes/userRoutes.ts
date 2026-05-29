import express from "express";
import userControllers from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const userRoutes = express.Router();
userRoutes.post("/insert-user-feedback", userControllers.insertNewUserFeedback);
userRoutes.get("/user-feedback", userControllers.readFeedbackFromUsers);
userRoutes.get("/me", authMiddleware, userControllers.readCurrentUser);
userRoutes.get("/me/stats", authMiddleware, userControllers.readCurrentUserStats);

export { userRoutes };
