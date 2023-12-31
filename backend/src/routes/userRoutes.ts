import express from "express";
import userControllers from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/check-username", userControllers.checkUsernameExistence);

userRoutes.post("/register-user", userControllers.registerNewUser);

userRoutes.post("/insert-user-feedback", userControllers.insertNewUserFeedback);

userRoutes.get("/user-feedback", userControllers.getFeedbackFromUsers);

export { userRoutes };
