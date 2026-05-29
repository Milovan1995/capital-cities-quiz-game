import express from "express";
import gameControllers from "../controllers/gameControllers.js";

const gameRoutes = express.Router();

gameRoutes.get("/config", gameControllers.getGameConfig);
gameRoutes.get("/regions", gameControllers.getRegions);
gameRoutes.get("/durations", gameControllers.getDurations);
gameRoutes.get("/capitals/:regionId?", gameControllers.getCapitals);

export { gameRoutes };
