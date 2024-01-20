import express from "express";
import gameControllers from "../controllers/gameControllers.js";

const gameRoutes = express.Router();

gameRoutes.get("/capitals/:regionId?", gameControllers.getCapitals);

export { gameRoutes };
