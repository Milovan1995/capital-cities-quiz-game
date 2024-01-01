import express from "express";
import userControllers from "../controllers/userControllers.js";

const userRoutes = express.Router();
userRoutes.post("/insert-user-feedback", userControllers.insertNewUserFeedback);
userRoutes.get("/user-feedback", userControllers.readFeedbackFromUsers);

export { userRoutes };
